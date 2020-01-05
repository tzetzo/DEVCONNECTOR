import {
  POST_CREATED,
  POST_DELETED,
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

    case POST_CREATED:
      return { ...state, loading: false, posts: [payload, ...state.posts] };

    case POST_DELETED:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post._id !== payload)
      };

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
