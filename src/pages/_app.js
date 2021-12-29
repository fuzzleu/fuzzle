import { useEffect } from "react"
import { useRouter } from "next/router"
import nProgress from "nprogress"
import "nprogress/nprogress.css"
import "../styles/index.css"

nProgress.configure({
	showSpinner: false,
	trickleRate: 0.02,
	trickleSpeed: 800,
})

export default function MyApp({ Component, pageProps }) {
	const router = useRouter()

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (
				e.ctrlKey == true &&
				(e.code == "NumpadAdd" ||
					e.code == "NumpadSubtract" ||
					e.code == "Equal" ||
					e.code == "Minus")
			)
				e.preventDefault()
		})
		document.addEventListener(
			"wheel",
			(e) => e.ctrlKey && e.preventDefault(),
			{ passive: false }
		)
	})

	useEffect(() => {
		router.events.on("routeChangeStart", () => nProgress.start())
		router.events.on("routeChangeComplete", () => nProgress.done())
		router.events.on("routeChangeError", () => nProgress.done())

		return () => {
			router.events.off("routeChangeStart", () => nProgress.start())
			router.events.off("routeChangeComplete", () => nProgress.done())
			router.events.off("routeChangeError", () => nProgress.done())
		}
	}, [router])

	return <Component {...pageProps} />
}
