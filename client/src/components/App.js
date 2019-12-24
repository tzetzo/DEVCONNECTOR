import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Alerts from "./layout/Alerts";
import Dashboard from "./dashboard/Dashboard";
import CreateProfile from "./profile-forms/CreateProfile";
import PrivateRoute from "./routing/PrivateRoute";
import { getCurrentUser } from "../actions";
import { store } from "../";
import "./App.css";

const App = () => {
  // Check if there is token in localStorage and if yes make a GET request to /api/auth to get the user
  // all this is done inside getCurrentUser
  useEffect(() => {
    store.dispatch(getCurrentUser());
  }, []);

  return (
    <Router history={history}>
      <React.Fragment>
        <Navbar />
        <Route path="/" exact component={Landing} />
        <section className="ui container">
          <Alerts />
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute
              path="/create-profile"
              exact
              component={CreateProfile}
            />
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  );
};

export default App;
