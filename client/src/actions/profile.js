import axios from "axios";
import history from "../history";
import {
  PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_CREATED
} from "./types";
// import { setAlert } from "./setAlert";

// Get current user profile
export const getCurrentUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.get("/api/profile/me");

    dispatch({
      type: USER_PROFILE_LOADED,
      payload: userProfile.data
    });
  } catch (e) {
    // console.log(e.response);
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Create user profile
export const createProfile = formValues => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.post("/api/profile", formValues);

    dispatch({
      type: USER_PROFILE_CREATED,
      payload: userProfile.data
    });

    history.push("/dashboard");
  } catch (e) {
    // console.log(e.response);
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
