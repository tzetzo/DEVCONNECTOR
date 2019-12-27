import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
//import { deleteExperience } from '../actions';

const Experience = ({ experiences }) => {
  experiences = experiences.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : " Now"}
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </React.Fragment>
  );
};

// const mapStateToProps = ({ auth }, ownProps) => {
//   return { isSignedIn: auth.isSignedIn };
// };

export default connect(
  null
  //{ deleteExperience }
)(Experience);
