import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {

  return (
    <Html>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,800;0,900;1,600&display=swap&family=Source+Sans+Pro:wght@200;300;400;700&display=swap" rel="stylesheet"  />
      {/* <title>Wedding Couples name</title> */}
        <meta name="description" content="Simple web app to have wedding info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
          <NextScript />
      </body>
    </Html>
  )
}