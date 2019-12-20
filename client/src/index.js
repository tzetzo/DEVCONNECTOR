import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

// Font Awesome:
import "@fortawesome/fontawesome-free/css/all.min.css"; //how to use: https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
// https://fontawesome.com/icons?d=gallery&m=free     -> choose from menu on the left -> click any icon image -> click 'Start using this icon'

import reducers from "./reducers";
import App from "./components/App";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  //export default store to access it outside a Component
  reducers,
  //initialState, //const initialState = {todos: [{ id: 123, name: 'example', completed: false }]}
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
