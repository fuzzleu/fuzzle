import { useState } from "react"
import { useProject } from "../Providers"

import style from "styles/app.module.scss"
import { Cursor, Text } from "lib/icons/Misc"

const AppCol = () => {
	const { project, setProject } = useProject()
	const [mode, setMode] = useState(project.mode)

	const handleChange = (e) => {
		const newMode = e.currentTarget.name
		setMode(newMode)
		setProject({
			...project,
			mode: newMode,
		})
	}

	return (
		<div className={style.headCol}>
			{mode === "cursor" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='cursor'
				>
					<Cursor />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='cursor'
					onClick={handleChange}
				>
					<Cursor />
				</button>
			)}
			{mode === "text" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='text'
				>
					<Text />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='text'
					onClick={handleChange}
				>
					<Text />
				</button>
			)}
		</div>
	)
}

export default AppCol
