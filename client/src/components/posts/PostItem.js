import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deletePost, updateLikes } from "../../actions";

const PostItem = ({
  user,
  isAuthenticated,
  post: { _id, text, name, avatar, owner, likes, comments, date },
  deletePost,
  updateLikes,
  showActions
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
      {showActions && (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-light"
            onClick={e => updateLikes(_id)}
          >
            <i className="fas fa-thumbs-up" />
            {"  "}
            {likes.length ? <span>{likes.length}</span> : null}
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={e => updateLikes(_id, "unlike")}
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length ? (
              <span className="comment-count">{comments.length}</span>
            ) : null}
          </Link>
          {owner === user._id && isAuthenticated && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={e => deletePost(_id)}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </React.Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = ({ auth }, ownProps) => {
  return { user: auth.user, isAuthenticated: auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { deletePost, updateLikes }
)(PostItem);
