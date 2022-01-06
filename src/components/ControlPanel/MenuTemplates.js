import Image from "next/image"
import style from "styles/controlPanel.module.scss"

const MenuTemplates = () => {
	const objects = []
	for (let i = 0; i < 5; i++)
		objects.push(
			<div
				className={style.controlPanelMenuObject}
				key={`templates${i}`}
				name='template'
			>
				<Image
					src={`/templates/${i}.jpg`}
					alt={`template${i}`}
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

export default MenuTemplates
