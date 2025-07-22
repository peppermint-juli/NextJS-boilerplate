'use client';

import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider, type DefaultTheme, createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '@mui/material/styles';
import themeJSON from '../../theme';
import { Layout } from 'components/common/layout';

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
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
    colors: {
      primary: '#B749B4',
      secondary: '#5D9CE7',
      contrast: '#F7961F'
    }
  };

  return (
    <ThemeProvider theme={themeJSON}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          {children}
        </Layout>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}
