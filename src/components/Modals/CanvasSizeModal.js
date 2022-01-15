import { useState } from "react"
import { useProject } from "../Providers"

import Modal from "./Modal"
import style from "styles/modal.module.scss"

export default ({ onClose }) => {
	const { project, setProject } = useProject()
	const [form, setForm] = useState({
		width: project.canvas[0],
		height: project.canvas[1],
	})

	const handleChange = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})

	const handleSubmit = () => {
		if (
			form.width === "0" ||
			form.height === "0" ||
			form.width === "" ||
			form.height === ""
		)
			return
		setProject({
			canvas: [form.width, form.height],
		})
		onClose()
	}

	return (
		<Modal title='Change canvas size' onClose={onClose}>
			<form
				onSubmit={(e) => handleSubmit(e.preventDefault())}
				className={style.defaultModal}
			>
				<label>Canvas size</label>
				<div className={style.canvasSizeBox}>
					<input
						type='number'
						name='width'
						placeholder='Width'
						value={form.width}
						className={style.canvasInput}
						onChange={handleChange}
					/>
					<select className={style.canvasSelect}>
						<option>px</option>
					</select>
				</div>
				<div className={style.canvasSizeBox}>
					<input
						type='number'
						name='height'
						placeholder='Height'
						value={form.height}
						className={style.canvasInput}
						onChange={handleChange}
					/>
					<select className={style.canvasSelect}>
						<option>px</option>
					</select>
				</div>
				<input type='submit' value='Sumbit' />
			</form>
		</Modal>
	)
}
