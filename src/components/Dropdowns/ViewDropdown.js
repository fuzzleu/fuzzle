import { useProject } from "../Providers"
import style from "styles/dropdown.module.scss"

const ViewDropdown = ({ setDropdowns }) => {
	const { setProject, project } = useProject()
	const closeDropdown = () =>
		setDropdowns((prevState) => {
			return {
				...prevState,
				view: false,
			}
		})

	const toggleFullscreen = () => {
		let element = document.body
		const isFullscreen =
			document.webkitIsFullScreen || document.mozFullScreen || false

		element.requestFullScreen =
			element.requestFullScreen ||
			element.webkitRequestFullScreen ||
			element.mozRequestFullScreen ||
			function () {
				return false
			}
		document.cancelFullScreen =
			document.cancelFullScreen ||
			document.webkitCancelFullScreen ||
			document.mozCancelFullScreen ||
			function () {
				return false
			}

		isFullscreen ? document.cancelFullScreen() : element.requestFullScreen()
	}

	const handleZoom = (e) => {
		project.zoom = parseFloat(project.zoom)
		if (project.zoom <= 0.1 && e.target.name === "-") return
		setProject({
			zoom:
				e.target.name === "+" ? project.zoom + 0.1 : project.zoom - 0.1,
		})
	}

	return (
		<div
			className={style.dropdown}
			name='view'
			onMouseLeave={closeDropdown}
		>
			<button
				className={style.dropdownBtn}
				name='+'
				onClick={handleZoom}
				disabled={project ? false : true}
			>
				Zoom in
			</button>
			<button
				className={style.dropdownBtn}
				name='-'
				onClick={handleZoom}
				disabled={project ? false : true}
			>
				Zoom out
			</button>
			<button className={style.dropdownBtn} onClick={toggleFullscreen}>
				Fullscreen
			</button>
		</div>
	)
}

export default ViewDropdown
