// @flow
import * as React from "react";
import "./PomodoroListItem.css";
import * as Utils from "./utils";
import type { TimerState } from "./types";
import PauseList from "./PauseList";

type Props = TimerState;

export default class PomodorListItem extends React.Component<Props> {
  render() {
    return (
      <li>
        <h2>{this.headerTitle()}</h2>
        <PauseList
          isPaused={true}
          pauses={this.props.pauses}
          pausedElapsed={this.props.pausedElapsed}
        />
      </li>
    );
  }

  headerTitle = () => {
    return `${Utils.formattedTime(this.props.secondsRemaining)} remaining`;
  };
}
