import {
  POST_CREATED,
  POST_LIKES_UPDATED,
  POST_LOADED,
  POSTS_ERROR,
  POSTS_LOADED,
  POSTS_LOADING
} from "../actions/types";

const INITIAL_STATE = {
  error: {},
  loading: false,
  post: null,
  posts: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case POSTS_LOADING:
      return { ...state, loading: true };

    case POSTS_LOADED:
      return { ...state, loading: false, posts: payload };

    case POSTS_ERROR:
      return { ...state, error: payload, loading: false };

    case POST_LIKES_UPDATED:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        )
      };

    default:
      return state;
  }
};
