import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" type="image/png" />
        </Head>
        <body id="app">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
