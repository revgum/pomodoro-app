// @flow
import React from "react";
import "./App.css";
import Timer from "./Timer";
import type { AppState, TimerState } from "./types";
import { save } from "./api";

type Props = {};

export default class App extends React.Component<Props, AppState> {
  static defaultProps = {};

  state: AppState = {
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
    // TODO: Add some Notification component and related state for success/error to the UI
    save(timer_state)
      .then(pomodoro => {
        this.setState({ pomodoros: [...this.state.pomodoros, pomodoro] });
      })
      .catch(error => console.error("ERROR", error));
  };
}
