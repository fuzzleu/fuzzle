import nookies from "nookies"

import ProjectProvider from "components/Providers"
import Application from "components"

export default ({ userServer, projectServer }) => {
	return (
		<ProjectProvider userServer={userServer} projectServer={projectServer}>
			<Application />
		</ProjectProvider>
	)
}

export const getServerSideProps = async (ctx) => {
	const cookie = nookies.get(ctx).user

	return {
		props: {
			userServer: cookie ? JSON.parse(cookie) : null,
			projectServer: null,
		},
	}
}
