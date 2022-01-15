import { useState } from "react"
import nookies from "nookies"

import { Wrapper } from "components"
import style from "styles/auth.module.scss"

export default ({ token }) => {
	const [state, setState] = useState({
		password: "",
		password_confirmation: "",
	})

	const handleChange = ({ target }) =>
		setState({
			...state,
			[target.name]: target.value,
		})

	const handleSubmit = () => {
		axios
			.post(`/auth/reset-password/${token}`, {
				password: state.password,
				password_confirmation: state.password_confirmation,
			})
			.then((res) => {
				alert(res.data.message)
			})
			.catch((err) => {
				alert(err.response.data.message)
			})
	}

	return (
		<Wrapper title='Change password'>
			<div className={style.auth}>
				<h1 className={style.authHeader}>Create your new password</h1>
				<form onSubmit={(e) => handleSubmit(e.preventDefault())}>
					<input
						type='password'
						name='password'
						placeholder='New password'
						value={state.password}
						onChange={handleChange}
					/>
					<input
						type='password'
						name='password_confirmation'
						placeholder='Repeat new password'
						value={state.password_confirmation}
						onChange={handleChange}
					/>
					<input type='submit' value='Submit' />
				</form>
			</div>
		</Wrapper>
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

	return { props: { token: ctx.params.token } }
}
