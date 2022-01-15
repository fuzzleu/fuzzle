import Modal from "./Modal"
import style from "styles/modal.module.scss"

export default ({ onClose }) => {
	return (
		<Modal title='Export you artwork' onClose={onClose}>
			<div className={style.exportModal}>text</div>
		</Modal>
	)
}
