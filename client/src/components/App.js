import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Alerts from "./layout/Alerts";
import "./App.css";

const App = () => (
  <Router history={history}>
    <React.Fragment>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <section className="ui container">
        <Alerts />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </section>
    </React.Fragment>
  </Router>
);

export default App;
