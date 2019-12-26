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

  // If the form hasnt been interacted with the formValues.skills are returned
  // as array instead of string which is what the back-end expects
  // If the form has been interacted with a string is returned
  if (typeof formValues.skills === "object") {
    formValues.skills = formValues.skills.join(",");
  }

  try {
    const userProfile = await axios.post("/api/profile", formValues);

    dispatch({
      type: USER_PROFILE_CREATED,
      payload: userProfile.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
