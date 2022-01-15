import Draggable from "react-draggable"
import { useProject } from "../Providers"

import CanvasObject from "./CanvasObject"
import CanvasText from "./CanvasText"
import style from "styles/app.module.scss"

const Canvas = () => {
	const { project } = useProject()

	const props = []
	for (let i = 0; i < project.objects.length; i++) {
		const obj = project.objects[i]
		if (obj.type === "object")
			props.push(<CanvasObject key={i} obj={obj} i={i} />)
		if (obj.type === "text")
			props.push(<CanvasText key={i} obj={obj} i={i} />)
	}

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
							backgroundImage: project.background,
							backgroundColor: project.background || "white",
						}}
					>
						{props}
					</div>
				</div>
			</Draggable>
		</main>
	)
}

export default Canvas
