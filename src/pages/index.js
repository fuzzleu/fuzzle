import nookies from "nookies"

import ProjectProvider from "components/Providers"
import Application from "components"

const App = ({ userServer, projectServer }) => {
	return (
		<>
			<ProjectProvider
				userServer={userServer}
				projectServer={projectServer}
			>
				<Application />
			</ProjectProvider>
		</>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	return {
		props: {
			userServer: cookie ? JSON.parse(cookie) : null,
			projectServer: null,
		},
	}
}

export default App
