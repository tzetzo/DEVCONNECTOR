import { USER_PROFILE_LOADED, USER_PROFILE_ERROR } from "../actions/types";

const INITIAL_STATE = {
  error: {},
  loading: true,
  profile: null,
  profiles: [],
  repos: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_LOADED:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };

    case USER_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
