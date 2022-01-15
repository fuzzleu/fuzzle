import { useState, createContext, useContext } from "react"
import Head from "next/head"

const ProjectContext = createContext({})
export const useProject = () => useContext(ProjectContext)

export default ({ children, userServer, projectServer }) => {
	const [user, setUser] = useState(userServer)
	const [project, setProject] = useState(projectServer ? projectServer : null)

	const userHandler = (value) => {
		value
			? setUser({
					...user,
					...value,
			  })
			: setUser(null)
	}

	const projectHandler = (value) => {
		value
			? setProject({
					...project,
					...value,
					zoom: value.zoom
						? parseFloat(parseFloat(value.zoom).toFixed(1))
						: 1,
					mode: value.mode ? value.mode : "cursor",
			  })
			: setProject(null)
	}

	return (
		<>
			<Head>
				<title>Fuzzle</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no'
				/>
			</Head>
			<ProjectContext.Provider
				value={{
					user,
					project,
					setUser: userHandler,
					setProject: projectHandler,
				}}
			>
				{children}
			</ProjectContext.Provider>
		</>
	)
}
