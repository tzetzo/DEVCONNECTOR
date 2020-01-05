import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";

const Post = ({ getPost, post, loadingPost, match }) => {
  useEffect(
    () => {
      getPost(match.params.id);
    },
    [getPost, match.params.id]
  );

  if (loadingPost || post === null) return <Spinner />;

  return (
    <React.Fragment>
      <Link to={`/posts`}>Back to Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
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
