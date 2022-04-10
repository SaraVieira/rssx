import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full bg-slate-800" lang="en">
      <Head></Head>
      <body className="h-full overflow-hidden text-rssx-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
