import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        {/* <link rel="preload" href="/svg/bbblurry.svg" /> */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="light" style={{ fontFamily: "'Raleway', sans-serif" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
