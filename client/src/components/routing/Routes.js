import React from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../layout/Loading";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alerts from "../layout/Alerts";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import PrivateRoute from "./PrivateRoute";

const Routes = () => (
  <section className="ui container">
    <Alerts />
    <Loading>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/profiles" exact component={Profiles} />
        <Route path="/profile/:id" exact component={Profile} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/create-profile" exact component={CreateProfile} />
        <PrivateRoute path="/edit-profile" exact component={EditProfile} />
        <PrivateRoute path="/add-experience" exact component={AddExperience} />
        <PrivateRoute path="/add-education" exact component={AddEducation} />
        <PrivateRoute path="/posts" exact component={Posts} />
        <PrivateRoute path="/posts/:id" exact component={Post} />
        <Route
          path="*"
          render={() => (
            <React.Fragment>
              <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle" />
                Page Not found
              </h1>
              <p className="large">Sorry, this page does not exist</p>
            </React.Fragment>
          )}
        />
      </Switch>
    </Loading>
  </section>
);

export default Routes;
