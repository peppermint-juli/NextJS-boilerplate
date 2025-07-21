/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Styles
import { ThemeProvider as StyledThemeProvider, type DefaultTheme, createGlobalStyle } from "styled-components";
import { ThemeProvider } from '@mui/material/styles';
import themeJSON from '../theme';
import '../styles/globals.css';

// Wrappers
import { ContextWrapper } from 'components/wrappers/Context';

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
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-optical-sizing: auto;
  }
    
  h1, h2, h3 {
    font-weight: 600;    
  }

  h4, h5 {
    font-weight: 500;    
  }
      
  p, blockquote {
    font-weight: 400;    
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-size: 18px;
    color: #666;
  }
  
  .caption {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-size: 12px;
  }

`;
  const theme: DefaultTheme = {
    "colors": {
      "primary": "#B749B4",
      "secondary": "#5D9CE7",
      "contrast": "#F7961F"
    }
  };

  return (
    <>
      <Head>
        <title>BARCS Vaccination Clinic</title>
        <link rel="icon" href={`${hostURL}favicon.ico`} type="image/png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={themeJSON}>
        <ContextWrapper>
          <StyledThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </StyledThemeProvider>
        </ContextWrapper>
      </ThemeProvider>
    </>
  );
}
