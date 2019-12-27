import {
  AUTH_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_ERROR,
  LOGOUT,
  USER_DELETED
} from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: null,
  loading: false,
  token: localStorage.getItem("token"),
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true };
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
    case LOGOUT:
    case USER_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
};
