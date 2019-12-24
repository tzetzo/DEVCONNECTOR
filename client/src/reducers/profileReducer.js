import {
  USER_PROFILE_CREATED,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_REMOVE
} from "../actions/types";

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
    case USER_PROFILE_CREATED:
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

    case USER_PROFILE_REMOVE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: []
      };

    default:
      return state;
  }
};
