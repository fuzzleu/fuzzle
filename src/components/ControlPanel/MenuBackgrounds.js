import Image from "next/image"
import style from "styles/controlPanel.module.scss"

const MenuBackgrounds = ({ project, setProject }) => {
	const objects = []
	for (let i = 0; i < 9; i++)
		objects.push(
			<div
				className={style.controlPanelMenuObject}
				key={`background${i}`}
				onClick={() => {
					setProject({
						...project,
						background: `url(lib/backgrounds/${i}.jpg)`,
					})
				}}
			>
				<Image
					src={`/lib/backgrounds/${i}.jpg`}
					alt={`background${i}`}
					width={200}
					height={100}
					layout='fixed'
					quality={35}
					objectFit='cover'
				/>
			</div>
		)

	return <>{objects}</>
}

export default MenuBackgrounds
