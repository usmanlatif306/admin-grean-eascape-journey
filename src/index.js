import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { AuthProvider } from "./Context/AuthContext";
import AdminLayout from "layouts/Admin.js";
import Login from "pages/Login";
// import Register from "pages/Register";
import Logout from "pages/Logout";
const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/register" component={Register}></Route> */}
        <Route path="/logout" component={Logout}></Route>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
