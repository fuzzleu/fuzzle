import { useRef } from "react"
import { useProject } from "../Providers"

import style from "styles/dropdown.module.scss"

const FileDropdown = ({ setDropdowns, setModals }) => {
	const { setProject } = useProject()
	const inputFile = useRef(null)

	const closeDropdown = () =>
		setDropdowns((prevState) => {
			return {
				...prevState,
				file: false,
			}
		})

	const openFile = (e) => {
		inputFile.current.click()
	}

	return (
		<div
			className={style.dropdown}
			name='file'
			onMouseLeave={closeDropdown}
		>
			<button
				className={style.dropdownBtn}
				onClick={() =>
					setModals((prevState) => {
						return {
							...prevState,
							fileNew: !prevState.fileNew,
						}
					})
				}
			>
				New
			</button>
			<button
				className={style.dropdownBtn}
				name='open'
				onClick={openFile}
			>
				Open existing
			</button>
			<button className={style.dropdownBtn}>Save project</button>
			<button className={style.dropdownBtn} onClick={() => setProject()}>
				Close project
			</button>
			<button
				className={style.dropdownBtn}
				name='import'
				onClick={openFile}
			>
				Import file
			</button>
			<button
				className={style.dropdownBtn}
				onClick={() =>
					setModals((prevState) => {
						return {
							...prevState,
							export: !prevState.export,
						}
					})
				}
			>
				Export as..
			</button>
			<input type='file' ref={inputFile} style={{ display: "none" }} />
		</div>
	)
}

export default FileDropdown
