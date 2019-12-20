import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions";
import { Field, reduxForm } from "redux-form";

const Register = ({ handleSubmit, registerUser }) => {
  const onSubmit = formValues => {
    registerUser(formValues);
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      {/*form uses https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css*/}
      <form
        className="ui form error"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Field
          name="name"
          component={renderInput}
          label="Enter Name"
          type="text"
        />

        <Field
          name="email"
          component={renderInput}
          label="Enter email"
          type="email"
        />

        <Field
          name="password"
          component={renderInput}
          label="Enter password"
          type="password"
        />

        <Field
          name="password2"
          component={renderInput}
          label="Re-enter password"
          type="password"
        />

        <button className="btn btn-primary">Register</button>
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </React.Fragment>
  );
};

const renderInput = ({ input, meta, label, type }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} type={type} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You must enter a name";
  }

  if (!validateEmail(formValues.email)) {
    errors.email = "Please enter a valid Email";
  }

  if (!formValues.password || formValues.password.length < 6) {
    errors.password = "Password should be at least 6 characters";
  }

  if (formValues.password !== formValues.password2) {
    errors.password2 = "Passwords do not match";
  }

  return errors;
};

// http://emailregex.com/
// this function can be extracted in /src/utils/validateEmail.js for use by other Components
const validateEmail = email =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );

//https://stackoverflow.com/questions/46791190/react-redux-form-and-connect-syntax
export default reduxForm({ form: "register", validate })(
  connect(
    null,
    { registerUser }
  )(Register)
);
