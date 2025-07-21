
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  "breakpoints": {
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 1094,
      "lg": 1280,
      "xl": 1920
    }
  },
  "palette": {
    "common": {
      "black": "#050505",
      "white": "#fff"
    },
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "primary": {
      "light": "##CED6F2",
      "main": "#B749B4",
      "contrastText": "#fff"
    },
    "secondary": {
      "main": "#5D9CE7",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "#202124",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)"
    }
  }
});

export default theme;

