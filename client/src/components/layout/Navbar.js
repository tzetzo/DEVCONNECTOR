import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions";

const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const renderLinks = () => {
    if (loading) {
      return null;
    }

    if (isAuthenticated) {
      return (
        <React.Fragment>
          <li>
            <Link to={"/dashboard"} className={""}>
              <i className="fas fa-user" />
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={"/"} className={""} onClick={logoutUser}>
              <i className="fas fa-sign-out-alt" />
              <span className="hide-sm">Logout</span>
            </Link>
          </li>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <Link to={"/register"} className={""}>
            Register
          </Link>
        </li>
        <li>
          <Link to={"/login"} className={""}>
            Login
          </Link>
        </li>
      </React.Fragment>
    );
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={"/"}>
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      <ul>{renderLinks()}</ul>
    </nav>
  );
};

const mapStateToProps = ({ auth }, ownProps) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
