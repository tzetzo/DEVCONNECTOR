import axios from "axios";
import history from "../history";
import { setAlert } from "./";
import {
  PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_CREATED,
  USER_PROFILE_UPDATED,
  USER_DELETED,
  USER_PROFILE_REMOVE,
  PROFILES_LOADED,
  USER_REPOS_LOADED
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

// Add user profile Experience
export const addExperience = formValues => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.put("/api/profile/experience", formValues);

    dispatch({
      type: USER_PROFILE_UPDATED,
      payload: userProfile.data
    });

    dispatch(setAlert("Experience added", "success"));

    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Add user profile Education
export const addEducation = formValues => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.put("/api/profile/education", formValues);

    dispatch({
      type: USER_PROFILE_UPDATED,
      payload: userProfile.data
    });

    dispatch(setAlert("Education added", "success"));

    history.push("/dashboard");
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Delete user profile Experience
export const deleteExperience = id => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: USER_PROFILE_UPDATED,
      payload: userProfile.data
    });

    dispatch(setAlert("Experience deleted", "success"));
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Delete user profile Education
export const deleteEducation = id => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userProfile = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: USER_PROFILE_UPDATED,
      payload: userProfile.data
    });

    dispatch(setAlert("Education deleted", "success"));
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Delete user profile & the user itself
export const deleteProfileAndUser = () => async (dispatch, getState) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    dispatch({ type: PROFILE_LOADING });

    try {
      await axios.delete("/api/profile");

      dispatch({ type: USER_PROFILE_REMOVE });

      dispatch({ type: USER_DELETED });

      dispatch(setAlert("User and his Profile deleted", "success"));
    } catch (e) {
      dispatch({
        type: USER_PROFILE_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status }
      });
    }
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  dispatch({ type: USER_PROFILE_REMOVE });

  try {
    const profiles = await axios.get("/api/profile");

    dispatch({
      type: PROFILES_LOADED,
      payload: profiles.data
    });
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const profile = await axios.get(`/api/profile/${userId}`);

    dispatch({
      type: USER_PROFILE_LOADED,
      payload: profile.data
    });
  } catch (e) {
    // console.log(e.response);
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response }
    });
  }
};

// Get user Github repos
export const getUserGithubRepos = username => async (dispatch, getState) => {
  dispatch({ type: PROFILE_LOADING });

  try {
    const userRepos = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: USER_REPOS_LOADED,
      payload: userRepos.data
    });
  } catch (e) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
