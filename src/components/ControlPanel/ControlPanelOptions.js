import { useState } from "react"
import { useProject } from "../Providers"

import style from "styles/controlPanel.module.scss"
import ControlPanelMenu from "./ControlPanelMenu"

const ControlPanelOptions = () => {
	const { project } = useProject()
	const [state, setstate] = useState({
		elements: false,
		uiElements: false,
		backgrounds: false,
		templates: false,
		userTemplates: false,
	})

	const handleChange = (e) =>
		setstate((prev) => {
			for (const key in prev) prev[key] = false
			return {
				...prev,
				[e.target.name]: !(e.target.value === "true" && true),
			}
		})

	return (
		<div className={style.controlPanelOptions}>
			{project && (
				<>
					<div className={style.controlPanelBox}>
						<button
							className={style.controlPanelOption}
							name='elements'
							value={state.elements}
							onClick={handleChange}
						>
							Elements
						</button>
						{state.elements && <ControlPanelMenu type='elements' />}
					</div>
					<div className={style.controlPanelBox}>
						<button
							className={style.controlPanelOption}
							name='uiElements'
							value={state.uiElements}
							onClick={handleChange}
						>
							UI elements
						</button>
						{state.uiElements && (
							<ControlPanelMenu type='uiElements' />
						)}
					</div>
					<div className={style.controlPanelBox}>
						<button
							className={style.controlPanelOption}
							name='backgrounds'
							value={state.backgrounds}
							onClick={handleChange}
						>
							Backgrounds
						</button>
						{state.backgrounds && (
							<ControlPanelMenu type='backgrounds' />
						)}
					</div>
				</>
			)}
			<div className={style.controlPanelBox}>
				<button
					className={style.controlPanelOption}
					name='templates'
					value={state.templates}
					onClick={handleChange}
				>
					Templates
				</button>
				{state.templates && <ControlPanelMenu type='templates' />}
			</div>
			{project && (
				<div className={style.controlPanelBox}>
					<button
						className={style.controlPanelOption}
						name='userTemplates'
						value={state.userTemplates}
						onClick={handleChange}
					>
						Your templates
					</button>
					{state.userTemplates && (
						<ControlPanelMenu type='userTemplates' />
					)}
				</div>
			)}
		</div>
	)
}

export default ControlPanelOptions
