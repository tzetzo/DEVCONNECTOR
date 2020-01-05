import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Loading from "./layout/Loading";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Alerts from "./layout/Alerts";
import Dashboard from "./dashboard/Dashboard";
import CreateProfile from "./profile-forms/CreateProfile";
import EditProfile from "./profile-forms/EditProfile";
import AddExperience from "./profile-forms/AddExperience";
import AddEducation from "./profile-forms/AddEducation";
import Profiles from "./profiles/Profiles";
import Profile from "./profile/Profile";
import Posts from "./posts/Posts";
import Post from "./post/Post";
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
          <Loading>
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:id" exact component={Profile} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute
                path="/create-profile"
                exact
                component={CreateProfile}
              />
              <PrivateRoute
                path="/edit-profile"
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path="/add-experience"
                exact
                component={AddExperience}
              />
              <PrivateRoute
                path="/add-education"
                exact
                component={AddEducation}
              />
              <PrivateRoute path="/posts" exact component={Posts} />
              <PrivateRoute path="/posts/:id" exact component={Post} />
            </Switch>
          </Loading>
        </section>
      </React.Fragment>
    </Router>
  );
};

export default App;
