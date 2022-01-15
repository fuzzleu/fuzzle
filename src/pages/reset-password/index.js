import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import nookies from "nookies"

import { Wrapper } from "components"
import style from "styles/auth.module.scss"

export default () => {
	const router = useRouter()
	const [email, setEmail] = useState("")

	const handleSubmit = () => {
		axios
			.post("/auth/reset-password", {
				email: email,
			})
			.then((res) => {
				alert(res.data.message)
			})
			.catch((err) => {
				alert(err.response.data.message)
			})
	}

	return (
		<Wrapper title='Reset password'>
			<div className={style.auth}>
				<h1 className={style.authHeader}>
					Let&apos;s get your password back!
				</h1>
				<span className={style.authInfo}>
					Enter you email so we can help you create a new one!
				</span>
				<form onSubmit={(e) => handleSubmit(e.preventDefault())}>
					<input
						type='email'
						placeholder='Your email'
						maxLength='16'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input type='submit' value='Send reset link' />
				</form>
				<span className={style.authOther}>
					<a onClick={() => router.back()} style={{ margin: 0 }}>
						Back
					</a>
				</span>
			</div>
		</Wrapper>
	)
}

export const getServerSideProps = async (ctx) => {
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	return { props: {} }
}
