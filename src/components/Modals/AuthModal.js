import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import { setCookie } from "nookies"
import { useProject } from "../Providers"

import Modal from "./Modal"
import { Google } from "lib/icons/Social"
import style from "styles/modal.module.scss"

export default ({ onClose }) => {
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
			[e.target.name]: e.target.value.trim(),
		})

	const handleSignIn = () => {
		for (const key in form)
			if (!form[key] || form[key].length === 0)
				switch (key) {
					case "email":
					case "password":
						return console.log(key)
				}
		axios
			.post(
				"/auth/signin",
				{
					email: form.email,
					password: form.password,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				const cookie = JSON.parse(res.data.cookie)
				setCookie(null, "user", res.data.cookie, {
					maxAge: cookie.ttl,
					path: "/",
				})
				setUser(cookie)
				onClose()
			})
	}

	const handleSignUp = () => {
		for (const key in form) if (!form[key] || form[key].length === 0) return
		axios
			.post(
				"/auth/signup",
				{
					name: form.name,
					email: form.email,
					password: form.password,
					password_confirmation: form.password_confirmation,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				const cookie = JSON.parse(res.data.cookie)
				setCookie(null, "user", res.data.cookie, {
					maxAge: cookie.ttl,
					path: "/",
				})
				setUser(cookie)
				onClose()
			})
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
						<label>Your email</label>
						<input
							type='email'
							name='email'
							placeholder='Your email'
							maxLength='16'
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
						<input type='submit' value='Sign in' />
						<a
							className={style.authThirdParty}
							name='google'
							href={`${process.env.API_URL}/auth/signin/google`}
						>
							<Google />
							Continue with&nbsp;<b>Google</b>
						</a>
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
								Sign up!
							</button>
						</span>
					</form>
				</Modal>
			)}
		</>
	)
}
