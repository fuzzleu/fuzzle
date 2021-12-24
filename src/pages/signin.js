import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import nookies, { setCookie } from "nookies"

import style from "../styles/auth.module.scss"

const Signin = () => {
	const router = useRouter()
	const [state, setState] = useState({
		name: "",
		password: "",
	})

	const handleChange = (target) =>
		setState({
			...state,
			[target.name]: target.value,
		})

	const handleSubmit = () => {
		const cookie = { name: "PAXANDDOS", email: "pashalitovka@gmail.com" }
		setCookie(null, "user", JSON.stringify(cookie), {
			maxAge: 162000,
			path: "/",
		})
		// const api = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json",
		// 	},
		// 	data: {
		// 		name: name,
		// 		password: password,
		// 	},
		// 	url: `${process.env.API_URL}/auth/signin`,
		// }
		// const promise = axios.post(api.url, api.data, {
		// 	headers: api.headers,
		// 	withCredentials: true,
		// })
		// toast.promise(promise, {
		// 	loading: "Logging in...",
		// 	success: (response) => {
		// 		setCookie(null, "user", response.data.cookie, {
		// 			maxAge: JSON.parse(response.data.cookie).ttl,
		// 			path: "/",
		// 		})
		// 		router.replace("/")
		// 		return response.data.message
		// 	},
		// 	error: (error) => {
		// 		if (error.response.data.errors) {
		// 			if (error.response.data.errors.name)
		// 				for (
		// 					let i = 0;
		// 					i < error.response.data.errors.name.length;
		// 					i++
		// 				)
		// 					toast.error(error.response.data.errors.name[i])
		// 			if (error.response.data.errors.password)
		// 				for (
		// 					let i = 0;
		// 					i < error.response.data.errors.password.length;
		// 					i++
		// 				)
		// 					toast.error(error.response.data.errors.password[i])
		// 		}
		// 		return error.response.data.message
		// 	},
		// })
	}

	return (
		<div className={style.auth}>
			<div className={style.authBlock}>
				<h1 className={style.authHeader}>Welcome to Fuzzle!</h1>
				<span className={style.authInfo}>
					Sign in to gain access to all community features.
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
						type='password'
						name='password'
						placeholder='Your password'
						value={state.password}
						onChange={(e) => handleChange(e.target)}
					/>
					<input type='submit' value='Sign in' />
				</form>
				<span className={style.authOther}>
					Forgot your password?{" "}
					<Link href='/reset-password'>
						<a>Let&apos;s get it back!</a>
					</Link>
				</span>
				<span className={style.authOther}>
					Not a member yet?{" "}
					<Link href='/signup'>
						<a>Sign up!</a>
					</Link>
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

export default Signin
