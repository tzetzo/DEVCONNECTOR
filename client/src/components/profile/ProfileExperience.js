import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {current ? "Current" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Location: </strong>
      {location}
    </p>
    <p>
      <strong>Position: </strong>
      {title}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </div>
);

export default ProfileExperience;
