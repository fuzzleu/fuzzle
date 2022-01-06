import Draggable from "react-draggable"

import { useProject } from "../Providers"
import style from "styles/app.module.scss"

const Canvas = () => {
	const { project } = useProject()

	return (
		<main style={{ transform: `scale(${project.zoom})` }}>
			<Draggable
				defaultPosition={{ x: 300, y: 200 }}
				handle='strong'
				scale={project.zoom}
			>
				<div
					className={style.canvasBox}
					style={{
						width: project.canvas[0] + "px",
						height: project.canvas[1] + 20 + "px",
					}}
				>
					<strong
						className={style.handle}
						style={{
							width: project.canvas[0] + "px",
							height: "20px",
						}}
					></strong>
					<div
						id={style.canvas}
						style={{
							width: project.canvas[0] + "px",
							height: project.canvas[1] + "px",
						}}
					></div>
				</div>
			</Draggable>
		</main>
	)
}

export default Canvas
