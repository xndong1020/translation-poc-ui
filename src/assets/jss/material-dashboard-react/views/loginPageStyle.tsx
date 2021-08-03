// ##############################
// // // LoginPage view styles
// #############################

import { Theme } from "@material-ui/core";
import { container, cardTitle } from "../../material-dashboard-react";

const loginPageStyle = (theme: Theme) => ({
  container: {
    ...container,
    zIndex: 4,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px",
    },
  },
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF",
  },
  textCenter: {
    textAlign: "center",
  },
  justifyContentCenter: {
    justifyContent: "center !important",
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF",
    },
    marginLeft: 5,
    marginRight: 5,
  },
  inputAdornment: {
    marginRight: 18,
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  cardHidden: {
    opacity: 0,
    transform: "translate3d(0, -60px, 0)",
  },
  cardHeader: {
    marginBottom: "20px",
  },
  socialLine: {
    padding: "0.9375rem 0",
  },
});

export default loginPageStyle;
