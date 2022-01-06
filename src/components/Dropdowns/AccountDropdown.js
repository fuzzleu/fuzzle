import { useProject } from "../Providers"
import Link from "next/link"
import { destroyCookie } from "nookies"

import style from "styles/dropdown.module.scss"

const AccountDropdown = ({ setDropdowns }) => {
	const { setUser } = useProject()

	const closeDropdown = () =>
		setDropdowns((prevState) => {
			return {
				...prevState,
				account: false,
			}
		})

	const logout = () => {
		// axios
		// 	.post(`${process.env.API_URL}/auth/signout`, null, {
		// 		headers: { Authorization: user.token },
		// 		withCredentials: true,
		// 	})
		// 	.then(() => {
		// 		destroyCookie(null, "user", { path: "/" })
		// 		return "Goodbye!"
		// 	})
		destroyCookie(null, "user", { path: "/" })
		setUser(null)
	}

	return (
		<div
			className={style.dropdown}
			name='account'
			onMouseLeave={closeDropdown}
		>
			<Link href='/account' passHref>
				<button className={style.dropdownBtn}>Account</button>
			</Link>
			<button
				className={style.dropdownBtn}
				name='danger'
				onClick={() => logout()}
			>
				Logout
			</button>
		</div>
	)
}

export default AccountDropdown
