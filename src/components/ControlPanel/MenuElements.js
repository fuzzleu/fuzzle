import Image from "next/image"
import style from "styles/controlPanel.module.scss"

const MenuElements = () => {
	const objects = []
	for (let i = 0; i < 23; i++)
		objects.push(
			<div
				className={style.controlPanelMenuObject}
				key={`element${i}`}
				name='element'
			>
				<Image
					src={`/elements/${i}.svg`}
					alt={`element${i}`}
					width={32}
					height={32}
					layout='fixed'
					quality={5}
					objectFit='cover'
				/>
			</div>
		)

	return <>{objects}</>
}

export default MenuElements
