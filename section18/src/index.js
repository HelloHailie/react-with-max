import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // store를 리액트에 제공하기

import "./index.css";
import App from "./App";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
