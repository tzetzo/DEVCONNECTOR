import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions";

const Dashboard = ({ getCurrentUserProfile, profile }) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);

  return <div>Dashboard</div>;
};

const mapStateToProps = ({ profile }, ownProps) => {
  return { profile: profile.profile };
};

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(Dashboard);
