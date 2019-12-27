import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { addEducation } from "../../actions";

const AddEducation = ({ handleSubmit, addEducation }) => {
  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const onSubmit = formValues => {
    // If both Current has been checked & To Date chosen
    // we delete the latter before sending
    if (formValues.current && formValues.to) delete formValues.to;

    addEducation(formValues);
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field
          name="degree"
          component={renderInput}
          label="* Degree"
          type="text"
          placeholder="Degree or Certificate"
        />

        <Field
          name="school"
          component={renderInput}
          label="* School"
          type="text"
          placeholder="School or Bootcamp"
        />

        <Field
          name="fieldofstudy"
          component={renderInput}
          label="Field of Study"
          type="text"
          placeholder="Field of Study"
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
          label="Current School?"
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
          placeholder="Program description"
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
        <textarea {...input} placeholder={placeholder} cols="30" rows="5" />
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

  // We need to validate at least the fields that are required by the Back-End!
  if (!formValues.degree) {
    errors.degree = "You must enter degree";
  }

  if (!formValues.school) {
    errors.school = "You must enter school";
  }

  if (!formValues.fieldofstudy) {
    errors.fieldofstudy = "You must enter Field of Study";
  }

  if (!formValues.from) {
    errors.from = "You must enter From Date";
  }

  if (!formValues.to && !formValues.current) {
    errors.to = "You must enter To Date";
  }

  return errors;
};

// When we want to pass data to our form we need to wrap the Component with reduxForm
//https://stackoverflow.com/questions/46791190/react-redux-form-and-connect-syntax
export default connect(
  null,
  { addEducation }
)(
  reduxForm({
    form: "addEducation",
    validate //,
    //enableReinitialize: true
  })(AddEducation)
);
