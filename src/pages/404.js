import Link from "next/link"
import Application from "components"

export default () => {
	return (
		<Application title={"404 Not Found"}>
			<h1
				style={{
					width: "100%",
					height: "calc(100vh - 274px)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				It looks like you are lost!
				<Link href='/'>
					<a
						style={{
							width: "fit-conent",
							height: "fit-conent",
							padding: 10,
							background: "#6775ee",
							borderRadius: 14,
							color: "white",
							marginTop: 20,
							fontSize: 28,
						}}
					>
						Home
					</a>
				</Link>
			</h1>
		</Application>
	)
}
