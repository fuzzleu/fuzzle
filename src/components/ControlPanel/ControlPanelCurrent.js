import { useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful"
import useDebouncy from "use-debouncy/lib/effect.es"
import { useProject } from "../Providers"

import { Trash, Cross } from "lib/icons/Misc"
import style from "styles/controlPanel.module.scss"

const ControlPanelCurrent = () => {
	const { project, setProject } = useProject()

	const [state, setState] = useState({
		w: project.current.w,
		h: project.current.h,
		x: project.current.x,
		y: project.current.y,
	})
	const [color, setColor] = useState(project.current.color)

	useEffect(() => {
		setState({
			w: project.current.w,
			h: project.current.h,
			x: project.current.x,
			y: project.current.y,
		})
		setColor(project.current.color)
	}, [project])

	const handleChange = (e) =>
		setState({
			...state,
			[e.target.name]: +e.target.value,
		})

	const handleSubmit = (e) => {
		let changed = false
		let changedProp = null
		let newValue = null
		for (const prop in state) {
			if (state[prop] !== project.current[prop]) {
				changed = true
				changedProp = prop
				newValue = state[prop]
				break
			}
		}
		if (!changed) return

		const newCurrent = {
			...project.current,
			[changedProp]: newValue,
		}
		let objects = project.objects
		objects[project.current.id] = newCurrent
		setProject({
			...project,
			current: newCurrent,
			objects: objects,
		})
	}

	const closeCurrent = () =>
		setProject({
			...project,
			current: null,
		})

	const deleteCurrent = () => {
		const objects = project.objects
		objects.splice(project.current.id, 1)
		setProject({
			...project,
			current: null,
			objects: objects,
		})
	}

	return (
		<div className={style.controlPanelCurrent}>
			<div className={style.controlPanelCurrentHead}>
				<h3>Current {project.current.type}</h3>
				<div>
					<button onClick={deleteCurrent}>
						<Trash />
					</button>
					<button onClick={closeCurrent}>
						<Cross />
					</button>
				</div>
			</div>
			<div className={style.currentPosSizeBox}>
				<div className={style.currentBox}>
					<label>
						<span>W:</span>
						<input
							type='number'
							name='w'
							placeholder='Width'
							value={state.w}
							onChange={handleChange}
							onBlur={handleSubmit}
						/>
					</label>
					<label>
						<span>H:</span>
						<input
							type='number'
							name='h'
							placeholder='Height'
							value={state.h}
							onChange={handleChange}
							onBlur={handleSubmit}
						/>
					</label>
				</div>
				<div className={style.currentBox}>
					<label>
						<span>X:</span>
						<input
							type='number'
							name='x'
							placeholder='X-axis position'
							value={state.x}
							onChange={handleChange}
							onBlur={handleSubmit}
						/>
					</label>
					<label>
						<span>Y:</span>
						<input
							type='number'
							name='y'
							placeholder='Y-axis position'
							value={state.y}
							onChange={handleChange}
							onBlur={handleSubmit}
						/>
					</label>
				</div>
			</div>
			<div className={style.currentColorBox}>
				<h4>Colors</h4>
				<div className={style.currentColorMenuBox}>
					<label>Primary color:</label>
					<DebouncedPicker
						color={color}
						onChange={setColor}
						project={project}
						setProject={setProject}
					/>
				</div>
			</div>
		</div>
	)
}

const DebouncedPicker = ({ color, onChange, project, setProject }) => {
	const [value, setValue] = useState(color)

	useDebouncy(
		() => {
			const newCurrent = {
				...project.current,
				color: value,
			}
			let objects = project.objects
			objects[project.current.id] = newCurrent
			setProject({
				...project,
				current: newCurrent,
				objects: objects,
			})
			onChange(value)
		},
		200,
		[value]
	)

	return <HexColorPicker color={value} onChange={setValue} />
}

export default ControlPanelCurrent
