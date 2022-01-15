import dynamic from "next/dynamic"
import style from "styles/controlPanel.module.scss"

const MenuElements = ({ project, setProject }) => {
	const objects = []
	for (let i = 0; i < 39; i++) {
		const DynamicComponent = dynamic(() =>
			import("../../../public/lib/elements").then((mod) => mod[`e${i}`])
		)
		objects.push(
			<div
				className={style.controlPanelMenuObject}
				key={`element${i}`}
				name='element'
				onClick={() => {
					const projObjects = project.objects
					projObjects.push({
						component: DynamicComponent,
						type: "object",
						color: "#000000",
						x: 0,
						y: 0,
						w: 100,
						h: 100,
					})
					setProject({
						...project,
						objects: projObjects,
					})
				}}
			>
				<DynamicComponent />
			</div>
		)
	}

	return <>{objects}</>
}

export default MenuElements
