import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, ...rest }) =>
  isAuthenticated ? <Route {...rest} /> : <Redirect to="/login" />;

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
