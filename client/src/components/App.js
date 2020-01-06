import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Routes from "./routing/Routes";

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
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route component={Routes} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
