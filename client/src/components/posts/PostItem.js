import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PostItem = ({
  user,
  isAuthenticated,
  post: { _id, text, name, avatar, owner, likes, comments, date }
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${owner}`}>
        <img className="round-img" src={avatar} alt="name" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
      <button type="button" className="btn btn-light">
        <i className="fas fa-thumbs-up" />
        {"  "}
        {likes.length ? <span>{likes.length}</span> : null}
      </button>
      <button type="button" className="btn btn-light">
        <i className="fas fa-thumbs-down" />
      </button>
      <Link to={`/post/${_id}`} className="btn btn-primary">
        Discussion{" "}
        {comments.length ? (
          <span className="comment-count">{comments.length}</span>
        ) : null}
      </Link>
      {owner === user._id && isAuthenticated && (
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ auth }, ownProps) => {
  return { user: auth.user, isAuthenticated: auth.isAuthenticated };
};

export default connect(mapStateToProps)(PostItem);
