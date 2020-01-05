import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";

const Post = ({ getPost, post, loadingPost, match }) => {
  useEffect(
    () => {
      getPost(match.params.id);
    },
    [getPost]
  );

  if (loadingPost || post === null) return <Spinner />;

  return (
    <React.Fragment>
      <Link to={`/posts`}>Back to Posts</Link>
      <PostItem post={post} showActions={false} />
    </React.Fragment>
  );
};

const mapStateToProps = ({ posts }, ownProps) => {
  return { loadingPost: posts.loading, post: posts.post };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
