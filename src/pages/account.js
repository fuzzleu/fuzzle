import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import nookies, { setCookie } from "nookies"

import { Wrapper } from "components"
import style from "styles/app.module.scss"

export default ({ user }) => {
	const router = useRouter()
	const [state, setState] = useState({
		name: "",
		email: "",
	})

	const handleChange = (e) =>
		setState({
			...state,
			[e.target.name]: e.target.value,
		})

	const uploadAvatar = () => {}

	const handleSubmit = () => {
		const data = {
			name: state.name,
			email: state.email,
		}

		if (data.name === user.name) delete data.name
		if (data.email === user.email) delete data.email

		if (Object.keys(data).length === 0) return

		axios
			.patch(`${process.env.API_URL}/users/me`, data, {
				headers: { Authorization: user.token },
				withCredentials: true,
			})
			.then((res) => {
				setCookie(null, "user", res.data.cookie, {
					maxAge: JSON.parse(res.data.cookie).ttl,
					path: "/",
				})
				router.reload()
			})
	}

	return (
		<Wrapper title='Account'>
			<div className={style.accountBlock}>
				<div className={style.accountEditable}>
					<form className={style.accountImageBlock}>
						<Image
							src={user.image}
							alt='avatarPreview'
							width={200}
							height={200}
							layout='fixed'
							quality={90}
							objectFit='cover'
							priority
						/>
						<label htmlFor='image'>Upload an image</label>
						<input
							id='image'
							onChange={uploadAvatar}
							type='file'
							accept='image/png, image/jpg, image/jpeg'
						/>
					</form>
					<form
						onSubmit={(e) => handleSubmit(e.preventDefault())}
						className={style.accountDataBlock}
					>
						<label htmlFor='name'>Username</label>
						<input
							id='name'
							value={state.name}
							onChange={handleChange}
							type='text'
							placeholder='Enter your username'
						/>

						<label htmlFor='email'>Email</label>
						<input
							id='email'
							value={state.email}
							onChange={handleChange}
							type='email'
							disabled={true}
						/>
						<input type='submit' value='Apply' />
					</form>
				</div>
			</div>
		</Wrapper>
	)
}

export const getServerSideProps = async (ctx) => {
	const cookie = nookies.get(ctx).user
	if (!!!cookie)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}
	const user = JSON.parse(cookie)

	return {
		props: {
			user,
		},
	}
}
