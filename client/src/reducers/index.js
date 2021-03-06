import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import alertsReducer from "./alertsReducer";
import profileReducer from "./profileReducer";
import postsReducer from "./postsReducer";

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer, //temp: () => 'temp'
  form: formReducer,
  alerts: alertsReducer,
  profile: profileReducer,
  posts: postsReducer
});
