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
      <div className="timer-controls">
        <ul>
          <li
            onClick={this.props.clickStartStop}
            className={this.startClasses()}
          >
            {this.props.isStarted ? "Finish" : "Start"}
          </li>
          {!this.props.isPaused &&
            this.props.isStarted && (
              <li onClick={this.props.clickPause} className="pause">
                Pause
              </li>
            )}
          {this.props.isStarted && (
            <li onClick={this.props.clickReset} className="reset">
              Restart
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
}
