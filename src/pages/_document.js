import { Html, Head, Main, NextScript } from 'next/document';

const img =
  'https://rawcdn.githack.com/SaraVieira/rssx/25be0cc093260bc67bae3bac9ea03c7fca92f1ba/public/gh.png';

export default function Document() {
  return (
    <Html className="h-full bg-slate-800" lang="en">
      <Head>
        <title>RSSX</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📬</text></svg>"
        ></link>
        <meta name="title" content="RSSX" />
        <meta
          name="description"
          content="A minimalistic RSS reader for the privacy minded"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="RSSX" />
        <meta
          property="og:description"
          content="A minimalistic RSS reader for the privacy minded"
        />
        <meta property="og:image" content={img} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="RSSX" />
        <meta
          property="twitter:description"
          content="A minimalistic RSS reader for the privacy minded"
        />
        <meta property="twitter:image" content={img} />
      </Head>
      <body className="h-full overflow-hidden text-rssx-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
