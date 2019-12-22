import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: null,
  loading: true,
  token: localStorage.getItem("token"),
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case USER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null
      };
    default:
      return state;
  }
};
