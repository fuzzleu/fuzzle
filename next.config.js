const path = require("path")
const mode = process.env.NODE_ENV === "production"

module.exports = {
	basePath: "",
	distDir: ".next",
	compress: true,
	generateEtags: true,
	trailingSlash: false,
	poweredByHeader: true,
	pageExtensions: ["js", "jsx"],
	eslint: {
		ignoreDuringBuilds: false,
	},
	images: {
		domains: ["d3djy7pad2souj.cloudfront.net"],
	},
	reactStrictMode: false,
	env: {
		API_URL: process.env.API_URL,
		GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
	},
	async redirects() {
		return [
			{
				source: "/user",
				destination: "/account",
				permanent: true,
			},
			{
				source: "/user/:name/events",
				destination: "/user/:name",
				permanent: true,
			},
		]
	},
}
