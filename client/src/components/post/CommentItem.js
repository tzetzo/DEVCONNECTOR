import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions";

const CommentItem = ({
  comment: { _id, text, name, avatar, owner, date },
  isAuthenticated,
  user,
  postId,
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${owner}`}>
        <img className="round-img" src={avatar} alt={name} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
      {owner === user._id && isAuthenticated && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={e => deleteComment(postId, _id)}
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ auth }, ownProps) => {
  return { isAuthenticated: auth.isAuthenticated, user: auth.user };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
