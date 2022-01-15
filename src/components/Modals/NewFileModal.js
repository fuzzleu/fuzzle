import { useState } from "react"
import { useProject } from "../Providers"

import Modal from "./Modal"
import style from "styles/modal.module.scss"

export default ({ onClose }) => {
	const { setProject } = useProject()
	const [form, setForm] = useState({
		name: "",
		width: "",
		height: "",
	})

	const handleChange = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})

	const handleTemplate = (e) => {
		const selected = e.target.value.split(",")
		setForm({
			...form,
			width: selected[0],
			height: selected[1],
		})
	}

	const handleSubmit = () => {
		if (
			form.name === "" ||
			form.width === "0" ||
			form.height === "0" ||
			form.width === "" ||
			form.height === ""
		)
			return
		setProject({
			name: form.name,
			canvas: [+form.width, +form.height],
			objects: [],
		})
		onClose()
	}

	return (
		<Modal title='New project' onClose={onClose}>
			<form
				onSubmit={(e) => handleSubmit(e.preventDefault())}
				className={style.defaultModal}
			>
				<label>Project name</label>
				<input
					type='text'
					name='name'
					placeholder='Project name'
					maxLength='16'
					value={form.name}
					className={style.modalInput}
					onChange={handleChange}
				/>
				<label>Canvas templates</label>
				<select
					className={style.canvasTemplate}
					onChange={handleTemplate}
				>
					<option value={[1280, 720]}>Custom</option>
					<optgroup label='Social'>
						<option value={[1640, 664]}>Facebook Cover</option>
						<option value={[1080, 1080]}>Instagram Profile</option>
						<option value={[1080, 1920]}>Instagram Story</option>
						<option value={[800, 800]}>YouTube Profile</option>
						<option value={[2560, 1440]}>YouTube Cover</option>
						<option value={[400, 400]}>Twitter Profile</option>
						<option value={[1500, 500]}>Twitter Cover</option>
					</optgroup>
					<optgroup label='Print'>
						<option value={[1122, 1587]}>A3</option>
						<option value={[794, 1122]}>A4</option>
						<option value={[559, 794]}>A5</option>
					</optgroup>
					<optgroup label='Screen'>
						<option value={[640, 480]}>SD &ndash; 480p</option>
						<option value={[1280, 720]}>HD &ndash; 720p</option>
						<option value={[1920, 1080]}>
							Full HD &ndash; 1080p
						</option>
						<option value={[2048, 1080]}>2K &ndash; 1080p</option>
						<option value={[2560, 1080]}>
							Quad HD &ndash; 1440p
						</option>
						<option value={[3840, 2160]}>
							Ultra HD &ndash; 2160p
						</option>
						<option value={[7680, 4320]}>
							Full Ultra HD &ndash; 4320p
						</option>
					</optgroup>
					<optgroup label='Mobile'>
						<option value={[640, 900]}>iPhone 4</option>
						<option value={[640, 1136]}>iPhone 4</option>
						<option value={[750, 1334]}>iPhone 8</option>
						<option value={[1080, 1920]}>iPhone 8+</option>
						<option value={[1126, 2436]}>iPhone X</option>
						<option value={[1080, 1920]}>Samsung S5</option>
						<option value={[1440, 2560]}>Samsung S8+</option>
						<option value={[1080, 1920]}>Google Pixel</option>
					</optgroup>
				</select>
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
				<input type='submit' value='Create' />
			</form>
		</Modal>
	)
}
