import dynamic from "next/dynamic"

import style from "styles/controlPanel.module.scss"

const ControlPanelMenu = ({ type }) => {
	const DynamicComponent = dynamic(() =>
		import(`./Menu${type.charAt(0).toUpperCase() + type.slice(1)}`)
	)

	return (
		<div className={style.controlPanelMenu}>
			<DynamicComponent />
		</div>
	)
}

export default ControlPanelMenu
