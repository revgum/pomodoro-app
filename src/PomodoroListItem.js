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
      <li className={this.classes()}>
        <span>{this.headerTitle()}</span>
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

  classes = () => {
    return this.props.visible ? "" : "hidden";
  };
}
