import type { AppProps } from 'next/app';

// Graphql
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

// Styles
import { createTheme, ThemeProvider } from '@mui/material';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import themeJSON from '../theme.json';
import '../styles/globals.css';

// Wrappers
import { AuthWrapper } from '../components/wrappers/Auth';
import { ContextWrapper } from '../components/wrappers/Context';

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
    margin-top: 20px;

    .big-number {
      font-size: 40px;
      font-weight: 400;
      margin: 0px;
    }

    .big-number-label {
      text-transform: uppercase;
    }
  }

`;

  const theme = createTheme({
    ...themeJSON,
    // disable performance-sucking transitions
    transitions: { create: () => 'none' }
  });

  return (
    <>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <ContextWrapper>
          <ThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
              <AuthWrapper>
                <Component {...pageProps} />
              </AuthWrapper>
            </StyledThemeProvider>
          </ThemeProvider>
        </ContextWrapper>
      </ApolloProvider>
    </>
  );
}
