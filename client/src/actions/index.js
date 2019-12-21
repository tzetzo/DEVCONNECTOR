import axios from "axios";
import uuid from "uuid";
import history from "../history";
import { REGISTER_USER, LOGIN_USER, SET_ALERT, REMOVE_ALERT } from "./types";

//REGISTER USER
export const registerUser = formValues => async (dispatch, getState) => {
  const response = await axios.post("/api/users", formValues);

  dispatch({
    type: REGISTER_USER,
    payload: response.data
  });

  history.push("/");
};

//LOGIN USER
export const loginUser = formValues => async (dispatch, getState) => {
  const response = await axios.post("/api/auth", formValues);

  dispatch({
    type: LOGIN_USER,
    payload: response.data
  });

  history.push("/");
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
