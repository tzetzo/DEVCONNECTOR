import React from "react";
import { connect } from "react-redux";
import { createComment } from "../../actions";
import PostAndCommentForm from "./PostAndCommentForm";

const CommentForm = ({ postId, createComment }) => {
  const submitHandler = text => createComment(postId, { text });

  return (
    <PostAndCommentForm
      heading={"Leave a comment..."}
      submitHandler={submitHandler}
    />
  );
};

export default connect(
  null,
  { createComment }
)(CommentForm);
