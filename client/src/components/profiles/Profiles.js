import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions";

const Profiles = ({ getProfiles, profiles }) => {
  useEffect(
    () => {
      getProfiles();
    },
    [getProfiles]
  );

  return (
    <React.Fragment>
      {profiles.length ? (
        <React.Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" />
            Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <div className="profiles">
          <h4>No profiles found...</h4>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ profile }, ownProps) => {
  return { profiles: profile.profiles };
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
