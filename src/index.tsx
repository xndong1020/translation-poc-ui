import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./assets/css/material-dashboard-react.css?v=1.6.0";
import Main from "./Main";
import { MainContextProvider } from "./context/MainContext";
import { WebSocketContextProvider } from "./context/WebSocketContext";
import { ApolloProvider } from "@apollo/react-common";
import { client } from "./client";

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Router history={history}>
        <CssBaseline />
        <MainContextProvider>
          <WebSocketContextProvider>
            <Main />
          </WebSocketContextProvider>
        </MainContextProvider>
      </Router>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
