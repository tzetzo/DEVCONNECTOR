import axios from "axios";
import history from "../history";
import { setAlert } from "./";

import {
  POST_CREATED,
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
