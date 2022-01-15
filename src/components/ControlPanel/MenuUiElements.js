import dynamic from "next/dynamic"
import style from "styles/controlPanel.module.scss"

const MenuUiElements = ({ project, setProject }) => {
	const objects = []
	for (let i = 0; i < 19; i++) {
		const DynamicComponent = dynamic(() =>
			import("../../../public/lib/uiElements").then(
				(mod) => mod[`ui${i}`]
			)
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

export default MenuUiElements
