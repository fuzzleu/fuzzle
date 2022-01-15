import { useState } from "react"
import { useProject } from "../Providers"

import AccountDropdown from "../Dropdowns/AccountDropdown"
import FileDropdown from "../Dropdowns/FileDropdown"
import EditDropdown from "../Dropdowns/EditDropdown"
import ImageDropdown from "../Dropdowns/ImageDropdown"
import ViewDropdown from "../Dropdowns/ViewDropdown"
import NewFileModal from "../Modals/NewFileModal"
import AuthModal from "../Modals/AuthModal"
import AboutModal from "../Modals/AboutModal"
import CanvasSizeModal from "../Modals/CanvasSizeModal"
import ExportModal from "../Modals/ExportModal"
import { GitHub } from "lib/icons/Social"
import style from "styles/app.module.scss"

const AppRow = () => {
	const { user, project } = useProject()
	const [dropdowns, setDropdowns] = useState({
		file: false,
		edit: false,
		image: false,
		view: false,
		account: false,
	})
	const [modals, setModals] = useState({
		fileNew: false,
		auth: false,
		about: user ? false : true,
		canvasSize: false,
		export: false,
	})

	const handleChange = (e) =>
		setDropdowns((prevState) => {
			for (const key in prevState) prevState[key] = false
			return {
				...prevState,
				[e.target.name]: !(e.target.value === "true" && true),
			}
		})

	return (
		<div className={style.headRow}>
			<div className={style.controlButtons}>
				<button
					className={style.headRowBtn}
					name='file'
					value={dropdowns.file}
					onMouseEnter={handleChange}
				>
					File
				</button>
				{dropdowns.file && (
					<FileDropdown
						setDropdowns={setDropdowns}
						setModals={setModals}
					/>
				)}

				<button
					className={style.headRowBtn}
					name='edit'
					value={dropdowns.edit}
					disabled={project ? false : true}
					onMouseEnter={handleChange}
				>
					Edit
				</button>
				{dropdowns.edit && <EditDropdown setDropdowns={setDropdowns} />}

				<button
					className={style.headRowBtn}
					name='image'
					value={dropdowns.image}
					disabled={project ? false : true}
					onMouseEnter={handleChange}
				>
					Image
				</button>
				{dropdowns.image && (
					<ImageDropdown
						setDropdowns={setDropdowns}
						setModals={setModals}
					/>
				)}

				<button
					className={style.headRowBtn}
					name='view'
					value={dropdowns.view}
					onMouseEnter={handleChange}
				>
					View
				</button>
				{dropdowns.view && <ViewDropdown setDropdowns={setDropdowns} />}
			</div>
			<div className={style.controlButtons}>
				{user ? (
					<>
						<button
							className={style.headRowBtn}
							name='account'
							value={dropdowns.account}
							onMouseEnter={handleChange}
						>
							{user.name}
						</button>
						{dropdowns.account && (
							<AccountDropdown setDropdowns={setDropdowns} />
						)}
					</>
				) : (
					<button
						className={style.headRowBtn}
						onClick={() =>
							setModals({
								...modals,
								auth: !modals.auth,
							})
						}
					>
						Sign in
					</button>
				)}
				<button
					className={style.headRowBtn}
					onClick={() =>
						setModals({
							...modals,
							about: !modals.about,
						})
					}
				>
					About
				</button>
				<a
					href='https://github.com/PAXANDDOS/webster-next'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<GitHub />
				</a>
			</div>
			{modals.fileNew && (
				<NewFileModal
					onClose={() =>
						setModals({
							...modals,
							fileNew: !modals.fileNew,
						})
					}
				/>
			)}
			{modals.auth && (
				<AuthModal
					onClose={() =>
						setModals({
							...modals,
							auth: !modals.auth,
						})
					}
				/>
			)}
			{modals.about && (
				<AboutModal
					onClose={() =>
						setModals({
							...modals,
							about: !modals.about,
						})
					}
				/>
			)}
			{modals.canvasSize && (
				<CanvasSizeModal
					onClose={() =>
						setModals({
							...modals,
							canvasSize: !modals.canvasSize,
						})
					}
				/>
			)}
			{modals.export && (
				<ExportModal
					onClose={() =>
						setModals({
							...modals,
							export: !modals.export,
						})
					}
				/>
			)}
		</div>
	)
}

export default AppRow
