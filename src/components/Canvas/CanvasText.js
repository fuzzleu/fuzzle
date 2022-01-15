import Image from "next/image"
import { useProject } from "components/Providers"

const CanvasText = ({ obj, i }) => {
	const { project, setProject } = useProject()

	return (
		<div
			key={i}
			style={{
				position: "absolute",
				width: obj.w,
				height: obj.h,
				transform: `translate(${obj.x}px, ${obj.y}px)`,
				cursor: "pointer",
				borderRadius: 1,
				boxShadow: project.current?.id === i && "0 0 0 2px #aaaaaa",
			}}
			onClick={() =>
				setProject({
					...project,
					current: {
						...obj,
						id: i,
					},
				})
			}
		>
			<Image
				src={`/lib/elements/1.svg`}
				alt={`element2`}
				width={obj.w}
				height={obj.h}
				layout='fixed'
				quality={100}
				objectFit='fill'
			/>
		</div>
	)
}

export default CanvasText
