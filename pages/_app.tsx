/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
import type { AppProps } from 'next/app';

// Graphql
import { ApolloProvider } from '@apollo/client';
import client from 'apollo-client';

// Styles
import { createTheme, ThemeProvider } from '@mui/material';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import themeJSON from '../theme.json';
import '../styles/globals.css';

// Wrappers
import { ContextWrapper } from 'components/wrappers/Context';
import Head from 'next/head';
import Script from 'next/script';

export const hostURL = `${process.env.NEXT_PUBLIC_HOST_BASE_PATH}`;
export const docsDownloadURL = `${hostURL}docs/`;

export default function App({ Component, pageProps }: AppProps) {

  const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  main {
    margin: 3% 5% 5% 10%;
  }

  h1, h2, h3, h4, h5 {
    font-family: "Roboto Slab", serif;
    font-style: normal;
    font-optical-sizing: auto;
    }
    
  h1, h2, h3 {
      font-weight: 600;    
  }

  h4, h5 {
      font-weight: 400;    
  }
  
  p, blockquote {
    font-family: "Noto Sans", sans-serif;
    font-style: normal;
    font-size: 18px;
    color: #666;
  }
  
  .caption {
    font-family: "Noto Sans", sans-serif;
    font-style: normal;
    font-size: 12px;
  }

`;

  const theme = createTheme({
    ...themeJSON,
    // disable performance-sucking transitions
    transitions: { create: () => 'none' }
  });

  return (
    <>
      <Head>
        <title>Johns Hopkins Turbulence Database JHTDB</title>
        <meta name="keywords" content="turbulence, database, jhu" />
        <meta name="description" content="This website is a portal to an Open Numerical Turbulence Laboratory that enables access to
            multi-Terabyte turbulence databases. The data reside on distributed nodes and disks on our database cluster
            computers and are stored in small 3D sub-cubes to accelerate access speeds to small data subsets." />
        <link rel="icon" href={`${hostURL}favicon.ico`} type="image/png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Slabo+27px&display=swap" rel="stylesheet" />
      </Head>
      <Script
        id="G-TAG"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_G_TAG}', {
                page_path: window.location.pathname,
              });
            `
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG}`}
      />
      <GlobalStyle />
      <ApolloProvider client={client}>
        <ContextWrapper>
          <ThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
              <Component {...pageProps} />
            </StyledThemeProvider>
          </ThemeProvider>
        </ContextWrapper>
      </ApolloProvider>
    </>
  );
}
