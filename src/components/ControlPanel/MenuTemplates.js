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
					src={`/lib/templates/${i}.jpg`}
					alt={`template${i}`}
					width={200}
					height={100}
					layout='fixed'
					quality={10}
					objectFit='cover'
				/>
			</div>
		)

	return <>{objects}</>
}

export default MenuTemplates
