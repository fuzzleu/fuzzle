import nookies from "nookies"
import Application from "../components"

const app = ({ user }) => {
	return (
		<Application user={user} title='Fuzzle'>
			s
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	const cookie = nookies.get(ctx).user

	return {
		props: {
			user: cookie ? JSON.parse(cookie) : null,
		},
	}
}

export default app
