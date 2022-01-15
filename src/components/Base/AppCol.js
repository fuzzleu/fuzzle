import { useState } from "react"
import { useProject } from "../Providers"

import style from "styles/app.module.scss"
import {
	Cursor,
	Text,
	Brush,
	Erase,
	Crop,
	Select,
	Fill,
	Gradient,
	Picker,
	Adjust,
} from "lib/icons/Misc"

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
			{mode === "select" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='select'
				>
					<Select />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='select'
					onClick={handleChange}
				>
					<Select />
				</button>
			)}
			{mode === "crop" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='crop'
				>
					<Crop />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='crop'
					onClick={handleChange}
				>
					<Crop />
				</button>
			)}
			{mode === "brush" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='brush'
				>
					<Brush />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='brush'
					onClick={handleChange}
				>
					<Brush />
				</button>
			)}
			{mode === "erase" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='erase'
				>
					<Erase />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='erase'
					onClick={handleChange}
				>
					<Erase />
				</button>
			)}
			{mode === "fill" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='fill'
				>
					<Fill />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='fill'
					onClick={handleChange}
				>
					<Fill />
				</button>
			)}
			{mode === "gradient" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='gradient'
				>
					<Gradient />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='gradient'
					onClick={handleChange}
				>
					<Gradient />
				</button>
			)}
			{mode === "picker" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='picker'
				>
					<Picker />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='picker'
					onClick={handleChange}
				>
					<Picker />
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
			{mode === "adjust" ? (
				<button
					className={`${style.headColBtn} ${style.active}`}
					name='adjust'
				>
					<Adjust />
				</button>
			) : (
				<button
					className={style.headColBtn}
					name='adjust'
					onClick={handleChange}
				>
					<Adjust />
				</button>
			)}
		</div>
	)
}

export default AppCol
