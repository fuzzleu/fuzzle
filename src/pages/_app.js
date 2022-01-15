import axios from "axios"
import "styles/index.css"

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.get["Accept"] = "application/json"
axios.defaults.headers.post["Accept"] = "application/json"
axios.defaults.headers.patch["Accept"] = "application/json"

export default ({ Component, pageProps }) => {
	return <Component {...pageProps} />
}
