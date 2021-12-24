import { useState } from "react"
import Link from "next/link"

import { Telegram, GitHub } from "../../lib/icons/Social"
import style from "../../styles/app.module.scss"

const AppRow = ({ user }) => {
	const [toggles, setToggles] = useState({
		account: false,
		file: false,
	})

	const handleChange = (e) => {
		setToggles({
			...toggles,
			[e.target.name]: !(e.target.value === "true" && true),
		})
	}

	return (
		<div className={style.headRow}>
			<div className={style.controlButtons}>
				<button className={style.headRowBtn}>File</button>
				<button className={style.headRowBtn}>Edit</button>
				<button className={style.headRowBtn}>Image</button>
				<button className={style.headRowBtn}>View</button>
			</div>
			<div className={style.controlButtons}>
				{user ? (
					<button
						className={style.headRowBtn}
						name='account'
						value={toggles.account}
						onClick={handleChange}
					>
						{user.name}
					</button>
				) : (
					<Link href='/signin'>
						<a className={style.headRowBtn}>Sign in</a>
					</Link>
				)}
				<button
					className={style.headRowBtn}
					onClick={() => console.log(toggles)}
				>
					About
				</button>
				<a
					href='https://t.me/PAXANDDOS'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<Telegram />
				</a>
				<a
					href='https://github.com/PAXANDDOS/webster-next'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<GitHub />
				</a>
			</div>
		</div>
	)
}

export default AppRow
