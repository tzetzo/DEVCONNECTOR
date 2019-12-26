import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { addExperience } from "../../actions";

const AddExperience = ({ handleSubmit, addExperience }) => {
  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const onSubmit = formValues => {
    // If both Current has been checked & To Date chosen
    // we delete the latter before sending
    if (formValues.current && formValues.to) {
      delete formValues.to;
    }

    addExperience(formValues);
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          name="title"
          component={renderInput}
          label="* Title"
          type="text"
          placeholder="Job Title"
        />

        <Field
          name="company"
          component={renderInput}
          label="* Company"
          type="text"
          placeholder="Company name"
        />

        <Field
          name="location"
          component={renderInput}
          label="Location"
          type="text"
          placeholder="Location"
        />

        <Field
          name="from"
          component={renderInput}
          label="From Date"
          type="date"
        />

        <Field
          name="current"
          component={renderInput}
          label="Current Job?"
          type="checkbox"
          onChange={() => toggleToDateDisabled(prev => !prev)}
        />

        <Field
          name="to"
          component={renderInput}
          label="To Date"
          type="date"
          disabled={toDateDisabled}
        />

        <Field
          name="description"
          component={renderInput}
          label="Description"
          type="textarea"
          placeholder="Job description"
        />

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

const renderInput = ({ input, meta, label, type, placeholder, disabled }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={className}>
      <label>{type === "checkbox" ? `${label}` : `Enter ${label}`}</label>
      {type === "textarea" ? (
        <textarea {...input} placeholder={label} cols="30" rows="5" />
      ) : (
        <p>
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
          />
        </p>
      )}

      {renderError(meta)}
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

  if (!formValues.title) {
    errors.title = "You must enter title";
  }

  if (!formValues.company) {
    errors.company = "You must enter company";
  }

  if (!formValues.to && formValues.from && !formValues.current) {
    errors.to = "You must enter To Date";
  }

  return errors;
};

// When we want to pass data to our form we need to wrap the Component with reduxForm
//https://stackoverflow.com/questions/46791190/react-redux-form-and-connect-syntax
export default connect(
  null,
  { addExperience }
)(
  reduxForm({
    form: "addExperience",
    validate //,
    //enableReinitialize: true
  })(AddExperience)
);
