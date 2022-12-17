// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    fontSizes: {
      xxl: string;
      xl: string;
      l: string;
      base: string;
      m: string;
      normal: string;
      s: string;
      xs: string;
      mediumBase: string;
    };

    colors: {
      companionPrimary: string;
      companionSecondary: string;
      companionTertiary: string;
      companionQuaternary: string;
      white: string;
      black: string;
      componentFill: string;
      gray: string;
      grayPrimary: string;
      grayTertiary: string;
      grayQuaternary: string;
      separator: string;
      primary: string;
      success: string;
      danger: string;
      warning: string;
      info: string;
      muted: string;
      bodyBackground: string;
      bodyText: string;
      optionListBackground: string;
      formElementBorder: string;
      formElementBackground: string;
      sideBarCheckboxActiveBackground: string;
      navBackgroundActive: string;
      filterOverlay: string;
      brandPrimary: string;
      brandSecondary: string;
      brandTertiary: string;
      brandTertiaryWithoutOpacity: string;
      brandQuaternary: string;
      graySecondary: string;
      emotionsGreen: string;
      emotionsRed: string;
      emotionsOrange: string;
      emotionsBlue: string;
      emotionsCoal: string;
      emotionsPastelBrown: string;
      emotionsNavy: string;
      emotionsDarkOrange: string;
      emotionsDarkTeal: string;
      emotionsLightBrown: string;
      emotionsLightBlue: string;
      emotionsPink: string;
      emotionsIndigo: string;
      emotionsGrass: string;
      emotionsYellow: string;
      paceFast: string;
      paceMedium: string;
      paceSlow: string;
      plum: string;
      destructivePrimary: string;
      destructiveSecondary: string;
      destructiveTertiary: string;
      destructiveQuaternary: string;
    };

    fontWeights: {
      light: string;
      normal: string;
      medium: string;
      bold: string;
    };

    lineHeights: {
      normal: string;
    };

    space: {
      extraSmall: string;
      mediumSmall: string;
      small: string;
      normal: string;
      large: string;
      extraLarge: string;
    };

    radii: {
      normal: string;
      small: string;
      large: string;
      medium: string;
    };

    animation: {
      duration: string;
    };

    borderWidth: string;

    flexboxgrid: {
      // Defaults
      gridSize: number;
      gutterWidth: string;
      outerMargin: number;
      mediaQuery: string;
      container: {
        sm: number;
        md: number;
        lg: number;
      };
      breakpoints: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
      };
    };
  }
}
