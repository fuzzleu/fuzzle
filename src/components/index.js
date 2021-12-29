import { useProject } from "./Providers"

import Head from "./Head"
import AppRow from "../components/Base/AppRow"
import AppCol from "../components/Base/AppCol"
import ControlPanel from "../components/ControlPanel"
import Canvas from "../components/Canvas"
import style from "../styles/app.module.scss"

const Application = () => {
	const { project } = useProject()

	return (
		<div className={style.app}>
			<AppRow />
			<div className={style.main} id='main'>
				{project && <AppCol />}
				{project && <Canvas />}
				<ControlPanel />
			</div>
		</div>
	)
}

export const Wrapper = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<div
				style={{
					display: "grid",
					placeItems: "center",
					width: "100vw",
					height: "100vh",
					background: "#202020",
				}}
			>
				{children}
			</div>
		</>
	)
}

export default Application
