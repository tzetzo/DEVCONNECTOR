import { REGISTER_USER, LOGIN_USER } from "../actions/types";

const INITIAL_STATE = {
  //isSignedIn: null,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
