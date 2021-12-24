import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import nookies, { setCookie } from "nookies"

import style from "../styles/auth.module.scss"

const Signup = () => {
	const router = useRouter()
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	})

	const handleChange = (target) =>
		setState({
			...state,
			[target.name]: target.value,
		})

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				name: name,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
			},
			url: `${process.env.API_URL}/auth/register`,
		}

		toast.promise(
			axios.post(api.url, api.data, {
				headers: api.headers,
				withCredentials: true,
			}),
			{
				loading: "Signing up..",
				success: (response) => {
					setCookie(null, "user", response.data.cookie, {
						maxAge: JSON.parse(response.data.cookie).ttl,
						path: "/",
					})
					router.replace("/")
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
								toast.error(
									error.response.data.errors.password[i]
								)
						if (error.response.data.errors.password)
							for (
								let i = 0;
								i < error.response.data.errors.password.length;
								i++
							)
								toast.error(
									error.response.data.errors.password[i]
								)
					}
					return error.response.data.message
				},
			}
		)
	}

	return (
		<div className={style.auth}>
			<div className={style.authBlock}>
				<h1 className={style.authHeader}>Welcome to Fuzzle!</h1>
				<span className={style.authInfo}>
					Join our community and start creating!
				</span>
				<form onSubmit={(e) => handleSubmit(e.preventDefault())}>
					<input
						type='text'
						name='name'
						placeholder='Your name'
						maxLength='16'
						value={state.name}
						onChange={(e) => handleChange(e.target)}
					/>
					<input
						type='email'
						name='email'
						placeholder='Your email'
						value={state.email}
						onChange={(e) => handleChange(e.target)}
					/>
					<input
						type='password'
						name='password'
						placeholder='Your password'
						value={state.password}
						onChange={(e) => handleChange(e.target)}
					/>
					<input
						type='password'
						name='password_confirmation'
						placeholder='Repeat your password'
						value={state.password_confirmation}
						onChange={(e) => handleChange(e.target)}
					/>
					<input type='submit' value='Sign in' />
				</form>
				<span className={style.authOther}>
					Already a member?{" "}
					<a onClick={() => router.back()}>Sign in!</a>
				</span>
			</div>
		</div>
	)
}

export async function getServerSideProps(ctx) {
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		}

	return { props: {} }
}

export default Signup
