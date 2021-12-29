import { useState } from "react"
import Link from "next/link"
import { setCookie } from "nookies"
import { useProject } from "../Providers"

import Modal from "./Modal"
import { Google } from "../../lib/icons/Social"
import style from "../../styles/modal.module.scss"

const AuthModal = ({ onClose }) => {
	const { setUser } = useProject()
	const [isSignIn, setSignIn] = useState(true)
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	})

	const handleChange = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})

	const handleThirdParty = (e) => {}

	const handleSignIn = () => {
		const cookie = {
			name: "PAXANDDOS",
			email: "pashalitovka@gmail.com",
			image: "https://d3djy7pad2souj.cloudfront.net/munity/avatars/avatar1_munity_H265P.png",
		}
		setCookie(null, "user", JSON.stringify(cookie), {
			maxAge: 162000,
			path: "/",
		})
		setUser(cookie)
		onClose()
	}

	const handleSignUp = () => {
		const cookie = {
			name: "PAXANDDOS",
			email: "pashalitovka@gmail.com",
			image: "https://d3djy7pad2souj.cloudfront.net/munity/avatars/avatar1_munity_H265P.png",
		}
		setCookie(null, "user", JSON.stringify(cookie), {
			maxAge: 162000,
			path: "/",
		})
		setUser(cookie)
		onClose()
	}

	const switchForm = () => setSignIn(!isSignIn)

	return (
		<>
			{isSignIn ? (
				<Modal title='Sign in' onClose={onClose}>
					<form
						onSubmit={(e) => handleSignIn(e.preventDefault())}
						className={style.defaultModal}
					>
						<label>Your name</label>
						<input
							type='text'
							name='name'
							placeholder='Your name'
							maxLength='16'
							value={form.name}
							className={style.modalInput}
							onChange={handleChange}
						/>
						<label>Your password</label>
						<input
							type='password'
							name='password'
							placeholder='Your password'
							value={form.password}
							className={style.modalInput}
							onChange={handleChange}
						/>
						<input type='submit' value='Sign in' />
						<button
							className={style.authThirdParty}
							name='google'
							onClick={(e) =>
								handleThirdParty(e.preventDefault())
							}
						>
							<Google />
							Continue with&nbsp;<b>Google</b>
						</button>
						<span className={style.authOther}>
							Forgot your password?{" "}
							<Link href='/reset-password'>
								<a>Let&apos;s get it back!</a>
							</Link>
						</span>
						<span className={style.authOther}>
							Not a member yet?{" "}
							<button
								onClick={(e) => switchForm(e.preventDefault())}
							>
								Sign up!
							</button>
						</span>
					</form>
				</Modal>
			) : (
				<Modal title='Sign up' onClose={onClose}>
					<form
						onSubmit={(e) => handleSignUp(e.preventDefault())}
						className={style.defaultModal}
					>
						<label>Your name</label>
						<input
							type='text'
							name='name'
							placeholder='Your name'
							maxLength='16'
							value={form.name}
							className={style.modalInput}
							onChange={handleChange}
						/>
						<label>Your email</label>
						<input
							type='email'
							name='email'
							placeholder='Your email'
							value={form.email}
							className={style.modalInput}
							onChange={handleChange}
						/>
						<label>Your password</label>
						<input
							type='password'
							name='password'
							placeholder='Your password'
							value={form.password}
							className={style.modalInput}
							onChange={handleChange}
						/>
						<label>Repeat your password</label>
						<input
							type='password'
							name='password_confirmation'
							placeholder='Repeat your password'
							value={form.password_confirmation}
							className={style.modalInput}
							onChange={handleChange}
						/>
						<input type='submit' value='Sign in' />
						<span className={style.authOther}>
							Already a member?{" "}
							<button
								onClick={(e) => switchForm(e.preventDefault())}
							>
								Sign in!
							</button>
						</span>
					</form>
				</Modal>
			)}
		</>
	)
}

export default AuthModal
