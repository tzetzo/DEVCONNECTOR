import React, { useState } from "react";

const PostAndCommentForm = ({ heading, submitHandler }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>{heading}</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          submitHandler(text);
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder={heading}
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

export default PostAndCommentForm;
