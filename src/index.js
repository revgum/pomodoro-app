// @flow

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

let element: HTMLElement | null = document.getElementById("root");
if (element !== null) {
  ReactDOM.render(<App />, element);
  registerServiceWorker();
} else {
  console.error("Unable to start app, couldn't find #root element.");
}
