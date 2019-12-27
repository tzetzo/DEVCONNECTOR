import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile, deleteProfileAndUser } from "../../actions";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentUserProfile,
  deleteProfileAndUser,
  profile,
  loadingProfile,
  user
}) => {
  useEffect(
    () => {
      getCurrentUserProfile();
    },
    [getCurrentUserProfile]
  );

  if (loadingProfile || user === null) return <Spinner />;

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome {user && user.name}
      </p>
      {profile ? (
        <React.Fragment>
          <DashboardActions />
          <Experience experiences={profile.experience} />
          <Education educations={profile.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteProfileAndUser();
              }}
            >
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </React.Fragment>
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
    loadingProfile: profile.loading
  };
};

export default connect(
  mapStateToProps,
  { getCurrentUserProfile, deleteProfileAndUser }
)(Dashboard);
