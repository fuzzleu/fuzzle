import { useEffect, useRef, useCallback } from "react"
import { useProject } from "./Providers"

import Head from "./Head"
import AppRow from "./Base/AppRow"
import AppCol from "./Base/AppCol"
import ControlPanel from "./ControlPanel"
import Canvas from "./Canvas"
import style from "styles/app.module.scss"

const Application = () => {
	const { project, setProject } = useProject()
	const ref = useRef(null)

	const handleZoom = useCallback(
		(type) => {
			if (!project) return
			project.zoom = +project.zoom
			if (project.zoom <= 0.1 && !type) return
			setProject({
				zoom: type ? project.zoom + 0.1 : project.zoom - 0.1,
			})
		},
		[project, setProject]
	)

	const keyHandler = useCallback(
		(e) => {
			if (
				e.code == "NumpadAdd" ||
				e.code == "NumpadSubtract" ||
				e.code == "Equal" ||
				e.code == "Minus"
			) {
				if (e.ctrlKey == true) e.preventDefault()
				switch (e.code) {
					case "NumpadAdd":
					case "Equal":
						handleZoom(true)
						break
					case "NumpadSubtract":
					case "Minus":
						handleZoom(false)
						break
				}
			}
		},
		[handleZoom]
	)

	const wheelHandler = useCallback(
		(e) => {
			e.preventDefault()
			handleZoom(e.deltaY < 0)
		},
		[handleZoom]
	)

	useEffect(() => {
		if (!ref.current) return

		const div = ref.current
		div.addEventListener("keydown", keyHandler)
		div.addEventListener("wheel", wheelHandler, { passive: false })
		div.focus()

		return () => {
			div.removeEventListener("keydown", keyHandler)
			div.removeEventListener("wheel", wheelHandler)
		}
	}, [ref, keyHandler, wheelHandler])

	return (
		<div className={style.app} ref={ref} tabIndex={0}>
			<AppRow />
			<div className={style.main} id='main'>
				{project && <AppCol />}
				{project && <Canvas />}
				<ControlPanel />
			</div>
		</div>
	)
}

export const Wrapper = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<div
				style={{
					display: "grid",
					placeItems: "center",
					width: "100vw",
					height: "100vh",
					background: "#202020",
				}}
			>
				{children}
			</div>
		</>
	)
}

export default Application
