import Image from "next/image"
import { useState } from "react"
import { setCookie } from "nookies"
import toast from "react-hot-toast"
import axios from "axios"
import nookies from "nookies"
import { useRouter } from "next/router"

import Application from "../components"
import style from "../styles/app.module.scss"
import AccountList from "../components/Account/AccountList"
import AccountNotificationList from "../components/Account/AccountNotificationList"

const Account = ({ user, events, notifications }) => {
	const router = useRouter()
	const [name, setName] = useState(user.name)
	const [email, setEmail] = useState(user.email)
	const [role, setRole] = useState(user.role === "company")

	const handleChange = (e) => {
		switch (e.target.id) {
			case "name":
				setName(e.target.value)
				break
			case "email":
				setEmail(e.target.value)
				break
			case "role":
				setRole(e.target.checked)
				break
			case "image":
				const formData = new FormData()
				formData.append(
					"image",
					document.querySelector("#image").files[0]
				)

				const api = {
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "application/json",
						Authorization: user.token,
					},
					data: formData,
					url: `${process.env.API_URL}/users/me/avatar`,
				}
				const promise = axios.post(api.url, api.data, {
					headers: api.headers,
					withCredentials: true,
				})
				toast.promise(promise, {
					loading: "Changing avatar...",
					success: (response) => {
						setCookie(null, "user", response.data.cookie, {
							maxAge: JSON.parse(response.data.cookie).ttl,
							path: "/",
						})
						router.reload()
						return response.data.message
					},
					error: (error) => error,
				})
				break
		}
	}

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: user.token,
			},
			data: {
				name: name,
				email: email,
				role: role ? "company" : "user",
			},
			url: `${process.env.API_URL}/users/me`,
		}

		if (name === user.name) delete api.data.name
		if (email === user.email) delete api.data.email
		if (role === (user.role === "company" ? true : false))
			delete api.data.role
		if (Object.keys(api.data).length === 0) {
			toast.error("Nothing to update.")
			return
		}

		const promise = axios.patch(api.url, api.data, {
			headers: api.headers,
			withCredentials: true,
		})

		toast.promise(promise, {
			loading: "Updating you...",
			success: (response) => {
				setCookie(null, "user", response.data.cookie, {
					maxAge: JSON.parse(response.data.cookie).ttl,
					path: "/",
				})
				return response.data.message
			},
			error: (error) => {
				if (error.response.data.errors) {
					if (error.response.data.errors.name)
						for (
							let i = 0;
							i < error.response.data.errors.name.length;
							i++
						)
							toast.error(error.response.data.errors.name[i])
					if (error.response.data.errors.email)
						for (
							let i = 0;
							i < error.response.data.errors.email.length;
							i++
						)
							toast.error(error.response.data.errors.email[i])
					if (error.response.data.errors.role)
						toast.error(error.response.data.errors.role)
				}
				return error.response.data.message
			},
		})
	}

	return (
		<Application user={user} title='Account'>
			<div className={style.accountBlock}>
				<div className={style.accountEditable}>
					<form className={style.accountImageBlock}>
						<Image
							src={user.image}
							alt='avatarPreview'
							width={200}
							height={200}
							layout='fixed'
							quality={100}
							objectFit='cover'
							priority
						/>
						<label htmlFor='image'>Upload an image</label>
						<input
							id='image'
							onChange={(e) => handleChange(e)}
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
							value={name}
							onChange={(e) => handleChange(e)}
							type='text'
							placeholder='Enter your username'
						/>

						<label htmlFor='email'>Email</label>
						<input
							id='email'
							value={user.email}
							onChange={(e) => handleChange(e)}
							type='email'
							disabled={true}
						/>
						<label htmlFor='role'>I&apos;m a company</label>
						<input
							id='role'
							checked={role}
							onChange={(e) => handleChange(e)}
							type='checkbox'
						/>
						<input type='submit' value='Apply' />
					</form>
				</div>
				<div className={style.accountLists}>
					<AccountList
						user={user}
						type={user.role === "user" ? "tickets" : "events"}
						events={events}
					/>
					<AccountNotificationList notifications={notifications} />
				</div>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user
	if (!!!cookie)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}
	const user = JSON.parse(cookie)

	const resEvents = await axios.get(
		`${process.env.API_URL}/users/me/events`,
		{
			headers: {
				Authorization: user.token,
			},
		}
	)

	const resNotifications = await axios.get(
		`${process.env.API_URL}/users/me/notifications`,
		{
			headers: {
				Authorization: user.token,
			},
		}
	)

	return {
		props: {
			user,
			events: resEvents.data,
			notifications: resNotifications.data,
		},
	}
}

export default Account
