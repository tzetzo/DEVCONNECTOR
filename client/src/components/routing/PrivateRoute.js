import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, loading, ...rest }) =>
  isAuthenticated || loading ? <Route {...rest} /> : <Redirect to="/login" />;

// Second version:
// const PrivateRoute = ({
//   component: Component,
//   isAuthenticated,
//   loading,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={props =>
//       !isAuthenticated && !loading ? (
//         <Redirect to="/login" />
//       ) : (
//         <Component {...props} />
//       )
//     }
//   />
// );

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);
