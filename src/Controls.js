// @flow

import * as React from "react";
import "./Controls.css";

type Props = {
  clickPause: Function,
  clickReset: Function,
  clickStartStop: Function,
  isPaused: boolean,
  isStarted: boolean,
  secondsRemaining: number
};

export default class Controls extends React.Component<Props> {
  render() {
    return (
      <div>
        <ul>
          <li
            onClick={this.props.clickStartStop}
            className={this.startClasses()}
          >
            Start/Stop
          </li>
          <li onClick={this.props.clickPause} className={this.pauseClasses()}>
            Pause
          </li>
          {this.props.isStarted && (
            <li onClick={this.props.clickReset} className={`reset`}>
              Reset
            </li>
          )}
        </ul>
      </div>
    );
  }

  startClasses = () => {
    let classes = ["start"];
    classes.push(this.props.isStarted ? "started" : "stopped");
    return classes.join(" ");
  };

  pauseClasses = () => {
    let classes = ["pause"];
    if (this.props.isPaused) classes.push("paused");
    classes.push(this.props.isStarted ? "enabled" : "disabled");
    return classes.join(" ");
  };
}
