import axios from "axios";
import uuid from "uuid";
import history from "../history";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  REMOVE_ALERT
} from "./types";

//REGISTER USER
export const registerUser = formValues => async (dispatch, getState) => {
  try {
    const response = await axios.post("/api/users", formValues);

    //Get the current user by sending the token in the request
    const user = await axios.get("/api/auth", {
      headers: { "x-auth-token": response.data.token }
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { ...response.data, user: { ...user.data } }
    });

    history.push("/");
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

    //Get the current user by sending the token in the request
    const user = await axios.get("/api/auth", {
      headers: { "x-auth-token": response.data.token }
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...response.data, user: { ...user.data } }
    });

    history.push("/");
  } catch (e) {
    dispatch(setAlert(e.response.data, "danger"));
    dispatch({
      type: LOGIN_FAIL
    });
  }
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
