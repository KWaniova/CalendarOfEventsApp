import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;
    padding: 0;
    transition: none;
    font-family: Roboto, sens-serif;
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.5;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }

  body {
    font-family: Roboto, sens-serif;
    color: ${({ theme }) => theme.colors.bodyText};
    background: ${({ theme }) => theme.colors.bodyBackground};
    font-size: ${({ theme }) => theme.fontSizes.normal};
    margin: 0;
    padding: 0;
  }

  a, button {
    font-family: Roboto, sens-serif;
  }

  input, textarea, button, select {
    border: 0;
    outline: none;
    font-family: inherit;
  }

  div, span, object, iframe, img, article, aside, canvas, details, figure, hgroup, menu, nav, footer, header, section, summary, mark, audio, video {
    border: 0;
    margin: 0;
    padding: 0;
    // transition: 0.2s all linear;
  }

  h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, address, cit, code,
  del, dfn, em, ins, q, samp, small, strong, sub, sup, b, i, hr, dl, dt, dd,
  ol, ul, li, fieldset, legend, label {
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    margin: 0;
    padding: 0;
    transition: 0.2s all linear;
  }

  ul {
    list-style: none;
  }

  article, aside, canvas, figure, figure img, figcaption, hgroup,
  footer, header, nav, section, audio, video {
    display: block;
  }


  select {
    appearance: select;
  }

`;
