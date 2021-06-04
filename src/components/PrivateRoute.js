import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ component: Component, ...res }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...res}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
