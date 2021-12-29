import { ResizableBox } from "react-resizable"
import "react-resizable/css/styles.css"

import style from "../../styles/controlPanel.module.scss"
import ControlPanelInfo from "./ControlPanelInfo"
import ControlPanelOptions from "./ControlPanelOptions"

const ControlPanel = () => {
	return (
		<ResizableBox
			width={200}
			height={Infinity}
			minConstraints={[200, Infinity]}
			maxConstraints={[700, Infinity]}
			axis='x'
			resizeHandles={["w"]}
			className={style.controlPanelResizable}
			handle={
				<div className={style.handleBox}>
					<div></div>
					<div></div>
				</div>
			}
			handleSize={[10, Infinity]}
		>
			<div className={style.controlPanel}>
				<ControlPanelOptions />
				<ControlPanelInfo />
			</div>
		</ResizableBox>
	)
}

export default ControlPanel
