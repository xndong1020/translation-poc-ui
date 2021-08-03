import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// core components
import { getIndexRoutes } from "./routes/index";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { MainContext } from "./context/MainContext";
import { me } from "./services/auth.service";

const Main = () => {
  const { role, setRole } = useContext(MainContext);

  useEffect(() => {
    async function LoadMe() {
      if (!role && localStorage.getItem("token")) {
        const { role } = await me();
        setRole(role);
      }
    }
    LoadMe();
    return () => {};
  }, [role, setRole]);

  const indexRoutes = getIndexRoutes(role);
  return (
    <>
      <Switch>
        {indexRoutes.map((prop, key) => {
          if (!prop.protected) {
            return (
              <Route path={prop.path} component={prop.component} key={key} />
            );
          }
          return (
            <PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}
      </Switch>
    </>
  );
};

export default Main;
