import Head from "next/head"
import style from "../styles/app.module.scss"
import AppRow from "./Base/AppRow"
import AppCol from "./Base/AppCol"

const Application = ({ children, user, title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div className={style.app}>
				<AppRow user={user} />
				<div className={style.main}>
					<AppCol user={user} />
					<main>{children}</main>
				</div>
			</div>
		</>
	)
}

export default Application
