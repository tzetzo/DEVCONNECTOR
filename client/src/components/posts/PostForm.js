import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions";
import PostAndCommentForm from "../post/PostAndCommentForm";

const PostForm = ({ createPost }) => {
  const submitHandler = text => createPost({ text });

  return (
    <PostAndCommentForm
      heading={"Say something..."}
      submitHandler={submitHandler}
    />
  );
};

export default connect(
  null,
  { createPost }
)(PostForm);
