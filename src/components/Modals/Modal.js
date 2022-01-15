import Draggable from "react-draggable"
import ReactModal from "react-modal"

import style from "styles/modal.module.scss"

ReactModal.setAppElement("#main")

export default ({ children, title, onClose }) => {
	return (
		<ReactModal
			isOpen={true}
			onRequestClose={onClose}
			className={style.modal}
			overlayClassName={style.overlay}
		>
			<Draggable bounds='#main' handle='blockquote'>
				<div className={style.modalContent}>
					<blockquote className={style.modalHeader}>
						<h2 className={style.modalTitle}>{title}</h2>
					</blockquote>
					<div className={style.modalBody}>{children}</div>
					<div className={style.modalFooter}>
						<button onClick={onClose}>Close</button>
					</div>
				</div>
			</Draggable>
		</ReactModal>
	)
}
