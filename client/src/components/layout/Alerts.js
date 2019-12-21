import React from "react";
import { connect } from "react-redux";

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = ({ alerts }, ownProps) => {
  return { alerts };
};

export default connect(mapStateToProps)(Alerts);
