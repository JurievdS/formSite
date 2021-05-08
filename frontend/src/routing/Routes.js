import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, auth }) => {
  return(
  <Route
    render={(props) => console.log(auth),
      auth === true ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
  )
};

const Routes = () => {
  const user = useSelector((state) => state.userLogin);
  const { isAuthenticated } = user;

  return (
      <section className="container">
        <Switch>
          <Route exact path="/Login" component={Login} />
          <PrivateRoute
            path="/Dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </section>
  );
};

export default Routes;
