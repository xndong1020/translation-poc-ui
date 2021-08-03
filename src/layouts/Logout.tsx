import React, { useRef } from "react";

// core components
import Footer from "../components/Footer/Footer";
import pagesStyle from "../assets/jss/material-dashboard-react/layouts/pagesStyle";
import bgImage from "../assets/img/register.jpeg";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

import loading from "../assets/img/loading.gif";
import { makeStyles } from "@material-ui/core";

interface Props {}

const useStyles = makeStyles(pagesStyle);

const LogoutLayout = (props: Props) => {
  const classes = useStyles();
  const wrapper = useRef(null);
  return (
    <div>
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        >
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={6} md={6}>
              <div>
                <img src={loading} alt="loading..." width="140px" />
              </div>
            </GridItem>
          </GridContainer>
          <Footer white />
        </div>
      </div>
    </div>
  );
};

export default LogoutLayout;
