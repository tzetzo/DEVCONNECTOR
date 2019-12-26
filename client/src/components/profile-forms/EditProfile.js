import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import { createOrEditProfile, getCurrentUserProfile } from "../../actions";

const EditProfile = ({
  createOrEditProfile,
  getCurrentUserProfile,
  profile,
  profileLoading
}) => {
  useEffect(
    () => {
      getCurrentUserProfile();
    },
    [getCurrentUserProfile]
  );

  const onSubmit = formValues => {
    createOrEditProfile(formValues, true);
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <ProfileForm
        onSubmit={onSubmit}
        initialValues={{ ...profile, ...profile.social }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ profile }) => {
  return {
    profileLoading: profile.loading,
    profile: profile.profile
  };
};

export default connect(
  mapStateToProps,
  { createOrEditProfile, getCurrentUserProfile }
)(EditProfile);
