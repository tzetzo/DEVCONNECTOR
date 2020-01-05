import React, { useState } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions";

const PostForm = ({ createPost }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          createPost({ text });
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="btn btn-dark my-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { createPost }
)(PostForm);
