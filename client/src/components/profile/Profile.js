import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfileById } from "../../actions";

const Profile = ({
  getProfileById,
  match,
  user,
  isAuthenticated,
  profile,
  loadingProfile
}) => {
  useEffect(
    () => {
      getProfileById(match.params.id);
    },
    [getProfileById, match.params.id]
  );

  if (loadingProfile) return <Spinner />;

  return (
    <React.Fragment>
      {profile ? (
        <React.Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {profile.owner &&
            user &&
            profile.owner._id === user._id &&
            isAuthenticated && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </React.Fragment>
      ) : (
        <div className="profiles">
          <h4>No profile found...</h4>
          <h5>Check your Internet connection</h5>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    profile: profile.profile,
    loadingProfile: profile.loading
  };
};

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
