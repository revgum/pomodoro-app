// @flow
import React, { Component } from "react";
import "./App.css";
import Timer from "./Timer";

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
  static defaultProps = {};

  render() {
    return (
      <div className="app">
        <Timer />
      </div>
    );
  }
}
