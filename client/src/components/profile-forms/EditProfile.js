import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { createOrEditProfile, getCurrentUserProfile } from "../../actions";

const EditProfile = ({
  handleSubmit,
  createOrEditProfile,
  getCurrentUserProfile,
  profileLoading
}) => {
  const [socialLinksOn, toggleSocialLinksOn] = useState(false);

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
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          name="status"
          component={renderInput}
          label="* Status"
          type="select"
          text="Give us an idea of where you are at in your career"
        />

        <Field
          name="company"
          component={renderInput}
          label="Company"
          type="text"
          text="Could be your own company or one you work for"
        />

        <Field
          name="website"
          component={renderInput}
          label="Website"
          type="text"
          text="Could be your own or a company website"
        />

        <Field
          name="location"
          component={renderInput}
          label="Location"
          type="text"
          text="City & state suggested (eg. Boston, MA)"
        />

        <Field
          name="skills"
          component={renderInput}
          label="* Skills"
          type="text"
          text="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
        />

        <Field
          name="githubusername"
          component={renderInput}
          label="Github Username"
          type="text"
          text="If you want your latest repos and a Github link, include your username"
        />

        <Field
          name="bio"
          component={renderInput}
          label="Bio"
          type="textarea"
          text="Tell us a little about yourself"
        />

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              toggleSocialLinksOn(prevVal => !prevVal);
            }}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {socialLinksOn && (
          <React.Fragment>
            <Field
              name="twitter"
              component={renderSocialInput}
              type="text"
              placeholder="Twitter URL"
            />

            <Field
              name="facebook"
              component={renderSocialInput}
              type="text"
              placeholder="Facebook URL"
            />

            <Field
              name="youtube"
              component={renderSocialInput}
              type="text"
              placeholder="YouTube URL"
            />

            <Field
              name="linkedin"
              component={renderSocialInput}
              type="text"
              placeholder="Linkedin URL"
            />

            <Field
              name="instagram"
              component={renderSocialInput}
              type="text"
              placeholder="Instagram URL"
            />
          </React.Fragment>
        )}

        <button className="btn btn-primary my-1" type="submit">
          Submit
        </button>

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
};

const renderInput = ({ input, meta, label, type, text }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={className}>
      <label>Enter {label}</label>
      {type === "textarea" ? (
        <textarea {...input} placeholder={label} />
      ) : type === "select" ? (
        <select {...input}>
          <option value="0">* Select Professional Status</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <input {...input} type={type} placeholder={label} autoComplete="off" />
      )}
      <small className="form-text">{text}</small>
      {renderError(meta)}
    </div>
  );
};

const renderSocialInput = ({ input, type, placeholder }) => {
  return (
    <div className="form-group social-input">
      <i className={`fab fa-2x fa-${input.name}`} />
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header"> {error} </div>
      </div>
    );
  }
};

const validate = formValues => {
  const errors = {};

  if (!formValues.skills) {
    errors.skills = "You must enter skills";
  }

  if (!formValues.status || formValues.status === "0") {
    errors.status = "You must choose status";
  }

  return errors;
};

const mapStateToProps = ({ profile }) => {
  return {
    profileLoading: profile.loading,
    initialValues: profile.profile
  };
};

// When we want to pass data to our form we need to wrap the Component with reduxForm
//https://stackoverflow.com/questions/46791190/react-redux-form-and-connect-syntax
export default connect(
  mapStateToProps,
  { createOrEditProfile, getCurrentUserProfile }
)(
  reduxForm({
    form: "editProfile", // a unique identifier for this form
    validate //,
    //enableReinitialize: true
  })(EditProfile)
);
