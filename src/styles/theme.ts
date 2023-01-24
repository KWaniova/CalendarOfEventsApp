import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    componentFill: "#F8FAFB",
    gray: "#737781",
    grayPrimary: "#3B3842",
    graySecondary: "#3B384280",
    grayTertiary: "#3B384240",
    grayQuaternary: "#3B38421A",
    separator: "#EAEDF0",
    primary: "#0081FF",
    success: "#63D423",
    danger: "#DF2626",
    warning: "#FDBF5E",
    info: "#CBE9FF",
    muted: "#8697A8",
    bodyBackground: "#E8EAED",
    bodyText: "#44566C",
    optionListBackground: "#D8ECFF",
    formElementBorder: "#B3C0CE",
    formElementBackground: "#EDEAF8",
    sideBarCheckboxActiveBackground: "#E6F0F5",
    navBackgroundActive: "#F6F5FB",
    brandPrimary: "#4F345A",
    brandSecondary: "#5D4E6D",
    brandTertiary: "#4F31B740",
    brandTertiaryWithoutOpacity: "#d3cbed",
    brandQuaternary: "#F5F3F7",
    filterOverlay: "#F2F2F2",
    emotionsGreen: "#06A77D",
    emotionsRed: "#FF5964",
    emotionsOrange: "#FFA630",
    emotionsBlue: "#0A64BC",
    emotionsCoal: "#393E41",
    emotionsPastelBrown: "#C9936F",
    emotionsNavy: "#2E5077",
    emotionsDarkOrange: "#D95D39",
    emotionsDarkTeal: "#0091AD",
    emotionsLightBrown: "#E9DDD4",
    emotionsLightBlue: "#A1C8F5",
    emotionsPink: "#EF5DA8",
    emotionsIndigo: "#5F5AA2",
    emotionsGrass: "#7CB518",
    emotionsYellow: "#EFCA08",
    paceFast: "#efca06",
    paceMedium: "#3c17a4",
    paceSlow: "#974fb9",
    plum: "#974FB9",
    companionPrimary: "#06D6A0",
    companionSecondary: "#82eacf",
    companionTertiary: "#c0f3e6",
    companionQuaternary: "#e7fbf6",
    destructivePrimary: "#bf0b0b",
    destructiveSecondary: "#de8484",
    destructiveTertiary: "#efc2c2",
    destructiveQuaternary: "#f9e7e7",
  },

  fontSizes: {
    xxl: "2.25rem",
    xl: "1.875rem",
    l: "1.5rem",
    mediumBase: "1.25rem",
    base: "16px",
    m: "0.875rem",
    normal: "14px",
    s: "0.75rem",
    xs: "0.75rem",
  },

  space: {
    extraSmall: "0.25rem",
    mediumSmall: "6px",
    small: "0.5rem",
    normal: "12px",
    large: "20px",
    extraLarge: "36px",
  },

  fontWeights: {
    light: "200",
    normal: "400",
    medium: "500",
    bold: "700",
  },

  lineHeights: {
    normal: "1.5",
  },

  radii: {
    small: "5px",
    normal: "8px",
    medium: "10px",
    large: "12px",
  },

  animation: {
    duration: "1.2s",
  },

  borderWidth: "0.0625rem",

  flexboxgrid: {
    // Defaults
    gridSize: 12, // columns
    gutterWidth: "0.5rem",
    outerMargin: 0,
    mediaQuery: "only screen",
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76, // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 64, // em
      lg: 75, // em
    },
  },
};
