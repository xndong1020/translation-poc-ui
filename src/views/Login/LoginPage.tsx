import { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";

import {
  container,
  cardTitle,
} from "../../assets/jss/material-dashboard-react";
import LoginForm from "./LoginForm";

interface Props {}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
    marginLeft: "5px",
    marginRight: "5px",
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
}));

const LoginPage = (props: Props) => {
  const [cardAnimaton, setCardAnimaton] = useState("cardHidden");
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    let timerId: any;
    timerId = setTimeout(() => {
      setCardAnimaton("");
    }, 700);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className={classes.container}>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={6} md={6}>
          <Card className={classes[cardAnimaton]}>
            <CardHeader
              className={`${classes.cardHeader} ${classes.textCenter}`}
              color="rose"
            >
              <h4 className={classes.cardTitle}>Welcome</h4>
              <div className={classes.socialLine}>
                {[
                  "fab fa-facebook-square",
                  "fab fa-twitter",
                  "fab fa-google-plus",
                ].map((prop, key) => {
                  return (
                    <Button
                      color="transparent"
                      justIcon
                      key={key}
                      className={classes.customButtonClass}
                    >
                      <i className={prop} />
                    </Button>
                  );
                })}
              </div>
            </CardHeader>
            <CardBody>
              <LoginForm />
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Typography color="textSecondary">Let's go</Typography>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default LoginPage;
