import { useState } from "react"
import { useRouter } from "next/router"
import nookies from "nookies"

import { Wrapper } from "../../components"
import style from "../../styles/auth.module.scss"

const ResetPassword = () => {
	const router = useRouter()
	const [email, setEmail] = useState("")

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				email: email,
			},
			url: `${process.env.API_URL}/auth/reset-password`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
		})
		toast.promise(promise, {
			loading: "Sending reset link...",
			success: (response) => {
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

export async function getServerSideProps(ctx) {
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	return { props: {} }
}

export default ResetPassword
