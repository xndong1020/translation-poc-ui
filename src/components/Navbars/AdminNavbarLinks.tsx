import React, { useState, useContext } from "react";
import classNames from "classnames";
import { makeStyles, Theme } from "@material-ui/core";
// @material-ui/core components
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";

import rtlHeaderLinksStyle from "../../assets/jss/material-dashboard-react/components/rtlHeaderLinksStyle";
import { useHistory } from "react-router-dom";
import Message from "./Message";
import { WebSocketContext } from "../../context/WebSocketContext";
import { UserRole } from "../../graphql/graphqlTypes";
import { MainContext } from "../../context/MainContext";

const useStyles = makeStyles<Theme>(rtlHeaderLinksStyle);

interface Props {}

const HeaderLinks = (props: Props) => {
  const { currentMessage } = useContext(WebSocketContext);
  const { role } = useContext(MainContext);
  console.log("currentMessage from navbar", currentMessage);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleToggle = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon={true} round={true}>
          <Search />
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp={true} implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>
            {currentMessage && role === UserRole.Translator ? 1 : 0}
          </span>
          <Hidden mdUp={true} implementation="css">
            <p className={classes.linkText}>
              {/* onClick={this.handleClick} */}
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition={true}
          disablePortal={true}
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role="menu">
                    {currentMessage && role === UserRole.Translator && (
                      <MenuItem
                        onClick={handleClose}
                        className={classes.dropdownItem}
                      >
                        <Message message={currentMessage} />
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        onClick={handleLogout}
        simple={!(window.innerWidth > 959)}
        aria-label="Person"
        className={classes.buttonLink}
      >
        <ExitToAppIcon className={classes.icons} />
        <Hidden mdUp={true} implementation="css">
          <p className={classes.linkText}>Profile</p>
        </Hidden>
      </Button>
    </div>
  );
};

export default HeaderLinks;
