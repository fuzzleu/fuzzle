import Modal from "./Modal"

import style from "styles/modal.module.scss"
import { Logo } from "lib/icons/Brand"
import { GitHub, Telegram } from "lib/icons/Social"

export default ({ onClose }) => {
	return (
		<Modal title='Welcome to Fuzzle!' onClose={onClose}>
			<div className={style.aboutModal}>
				<div className={style.aboutModalLogo}>
					<Logo />
				</div>
				<p>
					Fuzzle is an onine service for graphic design for creating
					your own masterpieces.
					<br />
					<br />
					Create your own piece of art using many editing tools.
					Upload your own fonts and images. Sign in to the service to
					save your creations and share with others.
				</p>
				<a
					href='https://github.com/PAXANDDOS/webster-next'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<GitHub />
					<span>View source code on GitHub</span>
				</a>
				<a
					href='https://t.me/PAXANDDOS'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<Telegram />
					<span>Paul Litovka</span>
				</a>
				<a
					href='https://t.me/NrTrN'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<Telegram />
					<span>Nazar Taran</span>
				</a>
				<a
					href='https://t.me/zeromotivat1on'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<Telegram />
					<span>Alexander Lyannoy</span>
				</a>
				<a
					href='https://t.me/noga_kazaha'
					target='_blank'
					rel='noreferrer'
					className={style.headRowBtn}
				>
					<Telegram />
					<span>Oleh Savich</span>
				</a>
			</div>
		</Modal>
	)
}
