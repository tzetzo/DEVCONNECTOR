import axios from "axios";
import history from "../history";
import { setAlert } from "./";
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

// Create/Edit user profile
export const createOrEditProfile = (formValues, edit = false) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.post("/api/profile", formValues);

    dispatch({
      type: USER_PROFILE_CREATED,
      payload: userProfile.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
