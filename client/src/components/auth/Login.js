import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { loginUser } from "../../actions";

const Login = ({ handleSubmit, loginUser, isAuthenticated }) => {
  const onSubmit = formValues => {
    loginUser(formValues);
  };

  // Redirect user if he is already logged in
  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <React.Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user" /> Login into your account
      </p>
      {/*form uses https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css*/}
      <form
        className="ui form error"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Field
          name="email"
          component={renderInput}
          label="Email"
          type="email"
        />
        <Field
          name="password"
          component={renderInput}
          label="Password"
          type="password"
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </React.Fragment>
  );
};

const renderInput = ({ input, meta, label, type }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>Enter {label}</label>
      <input {...input} type={type} placeholder={label} autoComplete="off" />
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

  if (!validateEmail(formValues.email)) {
    errors.email = "Please enter a valid Email";
  }

  if (!formValues.password) {
    errors.password = "Password required";
  }

  return errors;
};

// http://emailregex.com/
// this function can be extracted in /src/utils/validateEmail.js for use by other Components
const validateEmail = email =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );

const mapStateToProps = ({ auth }, ownProps) => {
  return { isAuthenticated: auth.isAuthenticated };
};

// When we want to pass data to our form we need to wrap the Component with reduxForm
//https://stackoverflow.com/questions/46791190/react-redux-form-and-connect-syntax
export default connect(
  mapStateToProps,
  { loginUser }
)(
  reduxForm({
    form: "login",
    validate //,
    //enableReinitialize: true
  })(Login)
);
