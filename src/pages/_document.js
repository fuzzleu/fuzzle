import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charSet='UTF-8' />
					<meta httpEquiv='content-type' content='text/html' />
					<meta
						name='description'
						content='Fuzzle is an onine service for graphic design for creating your own masterpieces.'
					/>
					<meta
						name='keywords'
						content='photoshop, editor, online-editor, image-editor, drawing, drawing-tool, creative'
					/>
					<meta name='author' content='Paul Litovka' />
					<meta name='owner' content='Paul Litovka' />
					<meta name='copyright' content='Paul Litovka' />
					<meta name='designer' content='Paul Litovka' />
					<meta name='reply-to' content='pashalitovka@gmail.com' />
					<meta name='distribution' content='global' />
					<meta name='subject' content='Drawing tool' />
					<meta name='language' content='EN, RU, UK, HU, DE' />
					<meta name='coverage' content='worldwide' />
					<meta name='rating' content='general' />
					<meta name='robots' content='all' />
					<meta name='googlebot' content='all' />
					<meta name='googlebot-news' content='all' />
					<meta name='revisit-after' content='1 day' />
					<meta httpEquiv='pragma' content='no-cache' />
					<meta httpEquiv='cache-control' content='no-cache' />
					<meta name='theme-color' content='#303030' />
					<link rel='shortcut icon' href='/favicon.ico' />
					<link rel='apple-touch-icon' href='/favicon.ico' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
