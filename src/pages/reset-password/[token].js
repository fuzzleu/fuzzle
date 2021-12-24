import { useState } from "react"
import nookies from "nookies"

import style from "../../styles/auth.module.scss"

const ResetPasswordToken = ({ token }) => {
	const [state, setState] = useState({
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
				password: password,
				password_confirmation: passwordConfirm,
			},
			url: `${process.env.API_URL}/auth/reset-password/${token}`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
		})
		toast.promise(promise, {
			loading: "Updating ...",
			success: (response) => {
				location.replace("/signin")
				return response.data.message
			},
			error: (error) => {
				if (error.response.data.errors) {
					if (error.response.data.errors.email)
						for (
							let i = 0;
							i < error.response.data.errors.email.length;
							i++
						)
							toast.error(error.response.data.errors.email[i])
				}
				return error.response.data.message
			},
		})
	}

	return (
		<div className={style.auth}>
			<div className={style.authBlock}>
				<h1 className={style.authHeader}>Create your new password</h1>
				<form onSubmit={(e) => handleSubmit(e.preventDefault())}>
					<input
						type='password'
						name='password'
						placeholder='New password'
						value={state.password}
						onChange={(e) => handleChange(e.target)}
					/>
					<input
						type='password'
						name='password_confirmation'
						placeholder='Repeat new password'
						value={state.password_confirmation}
						onChange={(e) => handleChange(e.target)}
					/>
					<input type='submit' value='Submit' />
				</form>
			</div>
		</div>
	)
}

export async function getServerSideProps(ctx) {
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	return { props: { token: ctx.params.token } }
}

export default ResetPasswordToken