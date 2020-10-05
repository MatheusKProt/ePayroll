import Document, { DocumentProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document<DocumentProps> {
	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<title>ePayroll</title>
					<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
