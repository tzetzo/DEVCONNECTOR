import {
  PROFILE_LOADING,
  USER_PROFILE_CREATED,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_REMOVE,
  USER_PROFILE_UPDATED,
  PROFILES_LOADED,
  USER_REPOS_LOADED
} from "../actions/types";

const INITIAL_STATE = {
  error: {},
  loading: false,
  profile: null,
  profiles: [],
  repos: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, loading: true };

    case USER_PROFILE_LOADED:
    case USER_PROFILE_CREATED:
    case USER_PROFILE_UPDATED:
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

    case PROFILES_LOADED:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    case USER_REPOS_LOADED:
      return {
        ...state,
        loading: false,
        repos: action.payload
      };

    default:
      return state;
  }
};
