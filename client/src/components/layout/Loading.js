import React from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const Loading = ({ loading, loadingProfile, children }) => {
  if (loading || loadingProfile) return <Spinner />;

  return children;
};

const mapStateToProps = ({ auth, profile }) => {
  return { loading: auth.loading, loadingProfile: profile.loading };
};

export default connect(mapStateToProps)(Loading);
