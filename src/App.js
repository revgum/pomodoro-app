// @flow
import React, { Component } from "react";
import "./App.css";
import Timer from "./Timer";
import type { AppState, TimerState } from "./types";

type Props = {};

export default class App extends Component<Props, AppState> {
  static defaultProps = {};

  state = {
    pomodoros: [],
    timer: {
      minutes: 25,
      seconds: 0
    }
  };

  render() {
    return (
      <div className="app">
        <Timer
          {...this.state.timer}
          completeSession={this.completeSession.bind(this)}
        />
      </div>
    );
  }

  completeSession = (timer_state: TimerState) => {
    this.setState({ pomodoros: [...this.state.pomodoros, timer_state] });
  };
}
