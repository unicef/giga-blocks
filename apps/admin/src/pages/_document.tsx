import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';
import palette from '../theme/palette';
import { primaryFont } from '../theme/typography';

export default class MyDocument extends Document {
  render() {
    const { nonce, emotionStyleTags } = this.props as any;

    return (
      <Html lang="en" className={primaryFont.className}>
        <Head nonce={nonce}>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={palette('light').primary.main} />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <meta name="emotion-insertion-point" content="" />
          {emotionStyleTags}
          <meta
            name="description"
            content="Together,we can reshape the narrative of education in the digital age. Join, collaborate, innovate."
          />
          <meta name="keywords" content="" />
          <meta name="author" content="Giga Blocks" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const nonce = ctx?.req?.headers?.['x-nonce'] || '';

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
    nonce,
  };
};
