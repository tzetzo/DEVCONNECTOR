import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import alerts from "./alerts";

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer, //temp: () => 'temp'
  form: formReducer,
  alerts
});
