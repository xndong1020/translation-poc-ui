import React, { useRef } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
// @material-ui/core components

// core components
import Footer from "../components/Footer/Footer";
import pagesStyle from "../assets/jss/material-dashboard-react/layouts/pagesStyle";
import bgImage from "../assets/img/register.jpeg";

import LoginPage from "../views/Login/LoginPage";

const useStyles = makeStyles(pagesStyle);

const LoginLayout = () => {
  const classes = useStyles();
  const wrapper = useRef(null);
  return (
    <div>
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        >
          <Route path="/login" component={LoginPage} />
          <Footer white />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
