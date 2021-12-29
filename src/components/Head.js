import Fur from "next/head"

const Head = ({ title }) => {
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

export default Head
