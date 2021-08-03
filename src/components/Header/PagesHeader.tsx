import React, { useState } from "react";
import cx from "classnames";
import { NavLink, useLocation } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";

// core components
import Button from "../../components/CustomButtons/Button";

// import pagesRoutes from "routes/pages.jsx";

import pagesHeaderStyle from "../../assets/jss/material-dashboard-react/components/pagesHeaderStyle";
import { makeStyles, Theme } from "@material-ui/core";

interface Props {
  color: string;
}
const useStyles = makeStyles<Theme>(pagesHeaderStyle);

const PagesHeader = ({ color = "rose" }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  // verifies if routeName is the one active (in browser input)
  // const activeRoute = (routeName: string) => {
  //   return location.pathname.indexOf(routeName) > -1;
  // };

  const classes = useStyles();

  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const list = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to={"/dashboard"} className={classes.navLink}>
          <ListItemIcon className={classes.listItemIcon}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={"Dashboard"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  );
  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              Material Dashboard Pro React
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              MD Pro React
            </Button>
          </div>
        </Hidden>
        <Hidden smDown>{list}</Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(pagesHeaderStyle)(PagesHeader);
