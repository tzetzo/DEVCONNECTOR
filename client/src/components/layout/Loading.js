import React from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const Loading = ({ loading, children }) => {
  if (loading) return <Spinner />;

  return children;
};

const mapStateToProps = ({ auth, profile }) => {
  return { loading: auth.loading };
};

export default connect(mapStateToProps)(Loading);
