import axios from "axios";
import history from "../history";
import { REGISTER_USER, LOGIN_USER } from "./types";
//
// export const signInOut = (isSignedIn, userId) => {
// 	if (isSignedIn) {
// 		return {
// 			type: SIGN_IN,
// 			payload: userId
// 		};
// 	} else {
// 		return {
// 			type: SIGN_OUT
// 		};
// 	}
// };

export const registerUser = formValues => async (dispatch, getState) => {
  const response = await axios.post("/api/users", formValues);

  dispatch({
    type: REGISTER_USER,
    payload: response.data
  });

  history.push("/");
};

export const loginUser = formValues => async (dispatch, getState) => {
  const response = await axios.post("/api/auth", formValues);

  dispatch({
    type: LOGIN_USER,
    payload: response.data
  });

  history.push("/");
};
