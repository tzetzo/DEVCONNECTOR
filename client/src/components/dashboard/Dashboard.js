import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile } from "../../actions";
import Spinner from "../layout/Spinner";

const Dashboard = ({ getCurrentUserProfile, profile, loading, user }) => {
  useEffect(
    () => {
      getCurrentUserProfile();
    },
    [getCurrentUserProfile]
  );

  if (loading || user === null) return <Spinner />;

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome {user && user.name}
      </p>
      {profile ? (
        "has"
      ) : (
        <React.Fragment>
          <p>You have not yet setup a profile</p>
          <Link to={"/create-profile"} className={"btn btn-primary my-1"}>
            Create Profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth, profile }, ownProps) => {
  return {
    user: auth.user,
    profile: profile.profile,
    loading: profile.loading
  };
};

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(Dashboard);
