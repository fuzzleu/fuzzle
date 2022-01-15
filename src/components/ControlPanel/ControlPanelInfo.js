import { useProject } from "../Providers"

import style from "styles/controlPanel.module.scss"

const ControlPanelInfo = () => {
	const { project } = useProject()
	if (!project)
		return (
			<div className={style.controlPanelInfo}>
				<span>No data to show.</span>
				<span>Create a project first.</span>
			</div>
		)

	return (
		<div className={style.controlPanelInfo}>
			<span>Project:&nbsp;{project.name}</span>
			<span>
				Canvas:&nbsp;{project.canvas[0]}x{project.canvas[1]}
			</span>
			<span>Objects:&nbsp;{project.objects.length}</span>
			<span>Zoom:&nbsp;{project.zoom}</span>
			<span>Mode:&nbsp;{project.mode}</span>
			<span>Status:&nbsp;Not saved</span>
		</div>
	)
}

export default ControlPanelInfo
