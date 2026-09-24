import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      contrast: string;
    };
  }

  export interface StyledComponentPropsWithRef<P> {
    theme?: DefaultTheme;
  }
}