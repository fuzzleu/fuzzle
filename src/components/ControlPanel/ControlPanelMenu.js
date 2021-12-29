import style from "../../styles/controlPanel.module.scss"

const ControlPanelMenu = ({ type }) => {
	return <div className={style.controlPanelMenu}>{type}</div>
}

export default ControlPanelMenu
