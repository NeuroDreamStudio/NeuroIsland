import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/neuroisland-favicon.ico" />
          <meta name="theme-color" content="#667eea" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
