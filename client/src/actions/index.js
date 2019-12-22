import axios from "axios";
import uuid from "uuid";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  REMOVE_ALERT,
  USER_LOADED,
  USER_ERROR,
  LOGOUT
} from "./types";

// Get current user (after setting the token in the Headers for any axios requests)
export const getCurrentUser = () => async (dispatch, getState) => {
  if (localStorage.token) {
    //sets the token in the Headers for future axios requests
    setAuthToken(localStorage.token);
  }

  try {
    //Get the current user (token included in the request thanks to setAuthToken)
    const user = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: user.data
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR
    });
  }
};

//REGISTER USER
export const registerUser = formValues => async (dispatch, getState) => {
  try {
    const response = await axios.post("/api/users", formValues);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });

    dispatch(getCurrentUser());
  } catch (e) {
    // const errors = e.response.data.errors;

    // if (errors)
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch(setAlert(e.response.data, "danger"));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//LOGIN USER
export const loginUser = formValues => async (dispatch, getState) => {
  try {
    const response = await axios.post("/api/auth", formValues);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(getCurrentUser());
  } catch (e) {
    dispatch(setAlert(e.response.data, "danger"));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//LOGOUT
export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT
  });
};

//SET ALERT
export const setAlert = (msg, alertType, timeout = 5000) => async (
  dispatch,
  getState
) => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType }
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};
