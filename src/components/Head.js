import Fur from "next/head"

export default ({ title }) => {
	return (
		<Fur>
			<title>{title} &#8739; Fuzzle</title>
			<meta
				name='viewport'
				content='initial-scale=1.0, width=device-width'
			/>
		</Fur>
	)
}
