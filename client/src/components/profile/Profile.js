import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById, getUserGithubRepos } from "../../actions";

const Profile = ({
  getProfileById,
  getUserGithubRepos,
  match,
  user,
  isAuthenticated,
  profile,
  loadingProfile,
  repos
}) => {
  useEffect(
    () => {
      getProfileById(match.params.id);
    },
    [getProfileById, match.params.id]
  );

  useEffect(
    () => {
      if (profile) getUserGithubRepos(profile.githubusername);
    },
    [profile, getUserGithubRepos]
  );

  const renderExperience = () => {
    if (profile.experience.length > 0) {
      return (
        <React.Fragment>
          {profile.experience.map(exp => (
            <ProfileExperience key={exp._id} experience={exp} />
          ))}
        </React.Fragment>
      );
    }

    return <h4>No experience credentials</h4>;
  };

  const renderEducation = () => {
    if (profile.education.length > 0) {
      return (
        <React.Fragment>
          {profile.education.map(edu => (
            <ProfileEducation key={edu._id} education={edu} />
          ))}
        </React.Fragment>
      );
    }

    return <h4>No education credentials</h4>;
  };

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
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {renderExperience()}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {renderEducation()}
            </div>
            <ProfileGithub repos={repos} />
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
    loadingProfile: profile.loading,
    repos: profile.repos
  };
};

export default connect(
  mapStateToProps,
  { getProfileById, getUserGithubRepos }
)(Profile);
