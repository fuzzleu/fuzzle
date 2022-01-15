import dynamic from "next/dynamic"
import { useProject } from "components/Providers"

import style from "styles/controlPanel.module.scss"

const ControlPanelMenu = ({ type }) => {
	const { project, setProject } = useProject()
	const DynamicComponent = dynamic(() =>
		import(`./Menu${type.charAt(0).toUpperCase() + type.slice(1)}`)
	)

	return (
		<div className={style.controlPanelMenu}>
			<DynamicComponent project={project} setProject={setProject} />
		</div>
	)
}

export default ControlPanelMenu
