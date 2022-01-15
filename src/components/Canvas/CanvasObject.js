import { useState, useEffect } from "react"
import Draggable from "react-draggable"

import { useProject } from "components/Providers"
import style from "styles/app.module.scss"

const CanvasObject = ({ obj, i }) => {
	const { project, setProject } = useProject()
	const [position, setPosition] = useState({
		x: project.objects[i].x,
		y: project.objects[i].x,
	})
	const Component = obj.component

	useEffect(() => {
		setPosition({
			x: project.objects[i].x,
			y: project.objects[i].y,
		})
	}, [project]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleDrag = (e, ui) => {
		const { x, y } = position
		const newPos = {
			x: x + +ui.deltaX,
			y: y + +ui.deltaY,
		}
		const objects = project.objects
		const newCurrent = {
			...obj,
			x: newPos.x,
			y: newPos.y,
			id: i,
		}
		objects[i] = newCurrent

		setPosition({
			x: newPos.x,
			y: newPos.y,
		})
		setProject({
			...project,
			current: newCurrent,
			objects: objects,
		})
	}

	return (
		<Draggable
			scale={project.zoom}
			position={position}
			onDrag={handleDrag}
			bounds={`#${style.canvas}`}
		>
			<div
				style={{
					position: "absolute",
					width: obj.w,
					height: obj.h,
					transform: `translate(${obj.x}px, ${obj.y}px)`,
					cursor: "pointer",
					borderRadius: 1,
					boxShadow: project.current?.id === i && "0 0 0 2px #aaaaaa",
				}}
				onClick={() =>
					setProject({
						...project,
						current: {
							...obj,
							id: i,
						},
					})
				}
			>
				<Component
					width={obj.w}
					height={obj.h}
					style={{
						fill: obj.color,
						stroke: obj.color,
					}}
				/>
			</div>
		</Draggable>
	)
}

export default CanvasObject
