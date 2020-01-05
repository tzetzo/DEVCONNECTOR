import axios from "axios";
import history from "../history";
import { setAlert } from "./";

import {
  COMMENT_CREATED,
  COMMENT_DELETED,
  POST_CREATED,
  POST_DELETED,
  POST_LIKES_UPDATED,
  POST_LOADED,
  POSTS_ERROR,
  POSTS_LOADED,
  POSTS_LOADING
} from "./types";

// Get all posts
export const getPosts = () => async (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });

  try {
    const posts = await axios.get("/api/posts");

    dispatch({
      type: POSTS_LOADED,
      payload: posts.data
    });
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Like/Unlike a Post
export const updateLikes = (postId, like = "like") => async (
  dispatch,
  getState
) => {
  dispatch({ type: POSTS_LOADING });

  try {
    const likes = await axios.put(`/api/posts/${like}/${postId}`);

    dispatch({
      type: POST_LIKES_UPDATED,
      payload: { postId, likes: likes.data }
    });
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Delete a Post
export const deletePost = postId => async (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });

  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: POST_DELETED,
      payload: postId
    });

    dispatch(setAlert("Post deleted", "success"));
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Create a Post
export const createPost = formValues => async (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });

  try {
    const post = await axios.post("/api/posts", formValues);

    dispatch({
      type: POST_CREATED,
      payload: post.data
    });

    dispatch(setAlert("Post created", "success"));
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Get a Post by ID
export const getPost = postId => async (dispatch, getState) => {
  dispatch({ type: POSTS_LOADING });

  try {
    const post = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: POST_LOADED,
      payload: post.data
    });
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Create a Comment
export const createComment = (postId, formValues) => async (
  dispatch,
  getState
) => {
  dispatch({ type: POSTS_LOADING });

  try {
    const postComments = await axios.put(
      `/api/posts/comment/${postId}`,
      formValues
    );

    dispatch({
      type: COMMENT_CREATED,
      payload: postComments.data
    });

    dispatch(setAlert("Comment created", "success"));
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Delete a Comment
export const deleteComment = (postId, commentId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: POSTS_LOADING });

  try {
    const postComments = await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`
    );

    dispatch({
      type: COMMENT_DELETED,
      payload: postComments.data //vs commentId
    });

    dispatch(setAlert("Comment deleted", "success"));
  } catch (e) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
