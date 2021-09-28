import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "../context/context";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;
