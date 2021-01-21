import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import { isAuthenticated } from "./auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const Routes = () => {

  const validatedUser = useSelector((state) => state.auth);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        validatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Login />} />
        <PrivateRoute path="/app" component={() => <Home />} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
