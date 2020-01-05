import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

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
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
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
