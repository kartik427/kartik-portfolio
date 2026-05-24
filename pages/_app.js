import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kartik Geete — Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer with 2+ years of experience building scalable enterprise applications in banking and finance. Specializing in Java, Spring Boot, microservices, and React." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Kartik Geete" />
        <meta property="og:title" content="Kartik Geete — Full Stack Developer" />
        <meta property="og:description" content="Building enterprise-grade software for the banking & finance industry." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kartik Geete — Full Stack Developer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
