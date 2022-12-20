// @ts-nocheck

import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import "./styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyles";

import App from "./App";

import ContextWrapper from "./context/ContextWrapper";
import { Modal } from "./context/ModalContext/Modal";

export const client = new ApolloClient({
  uri: "http://0.0.0.0:8000/graphql",
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ContextWrapper>
        <Modal>
          <App />
        </Modal>
      </ContextWrapper>
    </ApolloProvider>
  </ThemeProvider>,
  rootElement
);
