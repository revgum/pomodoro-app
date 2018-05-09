// @flow
import React from "react";
import "./App.css";
import Timer from "./Timer";
import PomodoroList from "./PomodoroList";
import type { AppState, TimerState } from "./types";
import { fetchAll, save } from "./api";

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

  componentDidMount() {
    fetchAll()
      .then(pomodoros => this.setState({ pomodoros }))
      .catch(error => console.error("ERROR", error));
  }

  render() {
    return (
      <div className="app">
        <Timer
          {...this.state.timer}
          completeSession={this.completeSession.bind(this)}
        />
        <PomodoroList pomodoros={this.state.pomodoros} />
      </div>
    );
  }

  completeSession = (timer_state: TimerState) => {
    // TODO: Add some Notification component and related state for success/error to the UI
    save(timer_state)
      .then(pomodoro => {
        this.setState({ pomodoros: [pomodoro, ...this.state.pomodoros] });
      })
      .catch(error => console.error("ERROR", error));
  };
}
