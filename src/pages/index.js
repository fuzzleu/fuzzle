import nookies from "nookies"
import Link from "next/link"

import style from "../styles/home.module.scss"

const index = ({ user }) => {
	return (
		<div className={style.homeScreen}>
			<div className={style.wrapBox}>
				<div className={style.logoBlock}>
					<h1>Fuzzle</h1>
				</div>
				<div className={style.homeButtons}>
					{user ? (
						<Link href='/account'>
							<a className={style.homeButton}>Account</a>
						</Link>
					) : (
						<Link href='/signin'>
							<a className={style.homeButton}>Sign in</a>
						</Link>
					)}
					<button className={style.homeButton}>New project</button>
					<button className={style.homeButton}>Templates</button>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	return {
		props: {
			user: cookie ? JSON.parse(cookie) : null,
		},
	}
}

export default index
