import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./assets/css/material-dashboard-react.css?v=1.6.0";
import Main from "./Main";
import { MainContextProvider } from "./context/MainContext";

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
      <CssBaseline />
      <MainContextProvider>
        <Main />
      </MainContextProvider>
    </Router>
  </BrowserRouter>,
  document.getElementById("root")
);
