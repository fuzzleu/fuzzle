import { ResizableBox } from "react-resizable"
import { useProject } from "components/Providers"
import "react-resizable/css/styles.css"

import style from "styles/controlPanel.module.scss"
import ControlPanelCurrent from "./ControlPanelCurrent"
import ControlPanelInfo from "./ControlPanelInfo"
import ControlPanelOptions from "./ControlPanelOptions"

const ControlPanel = () => {
	const { project } = useProject()
	return (
		<ResizableBox
			width={320}
			height={Infinity}
			minConstraints={[320, Infinity]}
			maxConstraints={[700, Infinity]}
			axis='x'
			resizeHandles={["w"]}
			className={style.controlPanelResizable}
			handle={
				<div className={style.handleBox}>
					<div />
					<div />
				</div>
			}
			handleSize={[10, Infinity]}
		>
			<div className={style.controlPanel}>
				<ControlPanelOptions />
				{project && project.current && <ControlPanelCurrent />}
				<ControlPanelInfo />
			</div>
		</ResizableBox>
	)
}

export default ControlPanel
