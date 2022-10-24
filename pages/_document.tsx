import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg" sizes="16x16" href="/count1024.svg" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/count1024.svg" />
        <meta name="theme-color" content="#f1f2f6" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
