import React from "react";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import { createOrEditProfile } from "../../actions";

const CreateProfile = ({ createOrEditProfile }) => {
  const onSubmit = formValues => {
    createOrEditProfile(formValues);
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <ProfileForm onSubmit={onSubmit} />
    </React.Fragment>
  );
};

export default connect(
  null,
  { createOrEditProfile }
)(CreateProfile);
