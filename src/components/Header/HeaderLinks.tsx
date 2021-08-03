import React, { useRef, useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";

// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";

// core components
import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";

const useStyles = makeStyles(headerLinksStyle);

interface Props {
  rtlActive: boolean;
}

const HeaderLinks = (props: Props) => {
  const [open, setOpen] = useState(false);
  let anchorEl = useRef(null);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { rtlActive } = props;
  const searchButton = classNames(classes.top, classes.searchButton, {
    [classes.searchRTL]: rtlActive,
  });
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });

  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  });

  return (
    <div className={wrapper}>
      <CustomInput
        rtlActive={rtlActive}
        formControlProps={{
          className: classes.top + " " + classes.search,
        }}
        inputProps={{
          placeholder: rtlActive ? "بحث" : "Search",
          inputProps: {
            "aria-label": rtlActive ? "بحث" : "Search",
            className: classes.searchInput,
          },
        }}
      />
      <Button
        color="white"
        aria-label="edit"
        justIcon
        round
        className={searchButton}
      >
        <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
      </Button>
      <Button
        color="transparent"
        simple
        aria-label="Dashboard"
        justIcon
        className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        muiClasses={{
          label: rtlActive ? classes.labelRTL : "",
        }}
      >
        <Dashboard
          className={
            classes.headerLinksSvg +
            " " +
            (rtlActive ? classes.links + " " + classes.linksRTL : classes.links)
          }
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            {rtlActive ? "لوحة القيادة" : "Dashboard"}
          </span>
        </Hidden>
      </Button>
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          onClick={handleClick}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : "",
          }}
          buttonRef={(node: any) => {
            anchorEl = node;
          }}
        >
          <Notifications
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <span onClick={handleClick} className={classes.linkText}>
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl.current}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true,
            [classes.pooperNav]: true,
          })}
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: "0 0 0" }}>
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role="menu">
                    <MenuItem onClick={handleClose} className={dropdownItem}>
                      {rtlActive
                        ? "إجلاء أوزار الأسيوي حين بل, كما"
                        : "Mike John responded to your email"}
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={dropdownItem}>
                      {rtlActive
                        ? "شعار إعلان الأرضية قد ذلك"
                        : "You have 5 new tasks"}
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={dropdownItem}>
                      {rtlActive
                        ? "ثمّة الخاصّة و على. مع جيما"
                        : "You're now friend with Andrew"}
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={dropdownItem}>
                      {rtlActive ? "قد علاقة" : "Another Notification"}
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={dropdownItem}>
                      {rtlActive ? "قد فاتّبع" : "Another One"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <Button
        color="transparent"
        aria-label="Person"
        justIcon
        className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        muiClasses={{
          label: rtlActive ? classes.labelRTL : "",
        }}
      >
        <Person
          className={
            classes.headerLinksSvg +
            " " +
            (rtlActive ? classes.links + " " + classes.linksRTL : classes.links)
          }
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            {rtlActive ? "الملف الشخصي" : "Profile"}
          </span>
        </Hidden>
      </Button>
    </div>
  );
};

export default HeaderLinks;
