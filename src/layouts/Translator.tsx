import React, { useRef, useState } from "react";
import { Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

// jss
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle";

// core components
import Navbar from "../components/Navbars/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
// import FixedPlugin from "../components/FixedPlugin/FixedPlugin";

import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";

// routes
import routes from "../routes/translator";
import { PrivateRoute } from "../components/Auth/PrivateRoute";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <PrivateRoute
          exact={prop.exact}
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
  </Switch>
);

const useStyles = makeStyles(dashboardStyle);

const Translator = () => {
  const [adminState, setAdminState] = useState({
    image: image,
    color: "blue",
    hasImage: true,
    fixedClasses: "dropdown show",
    mobileOpen: false,
  });
  const mainPanelRef = useRef(null);

  const handleDrawerToggle = () => {
    setAdminState({
      ...adminState,
      mobileOpen: !adminState.mobileOpen,
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes.filter((r) => r.showOnSidebar)}
        logoText={"Translator API"}
        logo={logo}
        image={adminState.image}
        handleDrawerToggle={handleDrawerToggle}
        open={adminState.mobileOpen}
        color={adminState.color}
      />
      <div className={classes.mainPanel} ref={mainPanelRef}>
        <Navbar routes={routes} handleDrawerToggle={handleDrawerToggle} />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Translator;
