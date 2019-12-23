import axios from "axios";
import { USER_PROFILE_LOADED, USER_PROFILE_ERROR } from "./types";
// import { setAlert } from "./setAlert";

// Get current user profile
export const getCurrentUserProfile = () => async (dispatch, getState) => {
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
