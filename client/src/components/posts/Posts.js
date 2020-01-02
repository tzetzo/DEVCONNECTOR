import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, loadingPosts, posts }) => {
  useEffect(
    () => {
      getPosts();
    },
    [getPosts]
  );

  if (loadingPosts) return <Spinner />;

  return (
    <React.Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community!
      </p>
      //form
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ posts }, ownProps) => {
  return { loadingPosts: posts.loading, posts: posts.posts };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
