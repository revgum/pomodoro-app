// @flow
import * as React from "react";
import "./Timer.css";
import Controls from "./Controls";
import PauseForm from "./PauseForm";
import PauseList from "./PauseList";
import type { PauseState, TimerState } from "./types";
import * as Utils from "./utils";

type Props = {
  completeSession: Function,
  minutes: number,
  seconds: number
};

export default class Timer extends React.Component<Props, TimerState> {
  static defaultProps = {
    minutes: 25,
    seconds: 0
  };

  state: TimerState = {
    isPaused: false,
    isStarted: true,
    minutes: 25,
    pauses: [],
    pausedElapsed: 0,
    seconds: 0,
    secondsElapsed: 0,
    secondsRemaining: 25 * 60,
    timer: null
  };

  constructor(props: Props) {
    super(props);
    this.state = Object.assign(this.state, {
      minutes: props.minutes,
      seconds: props.seconds,
      secondsRemaining: props.minutes * 60 + props.seconds
    });
  }

  componentDidMount() {
    let timer_id = setInterval(this.tick, 1000);
    this.setState({
      timer: timer_id
    });
  }

  render() {
    return (
      <div className="timer">
        <div className="remaining">
          {Utils.formattedTime(this.state.secondsRemaining)}
        </div>
        <Controls
          clickPause={this.clickPause}
          clickReset={this.clickReset}
          clickStartStop={this.clickStartStop}
          isPaused={this.state.isPaused}
          isStarted={this.state.isStarted}
          secondsRemaining={this.state.secondsRemaining}
        />
        <PauseForm
          isPaused={this.state.isPaused}
          pausedElapsed={this.state.pausedElapsed}
          savePause={this.savePause}
        />
        <PauseList
          isPaused={this.state.isPaused}
          pauses={this.state.pauses}
          pausedElapsed={this.state.pausedElapsed}
        />
      </div>
    );
  }

  clickPause = () => {
    this.setState({
      isPaused: !this.state.isPaused
    });
  };

  clickReset = () => {
    if (this.state.timer !== null) clearInterval(this.state.timer);
    this.setState({
      isPaused: false,
      isStarted: false,
      timer: null,
      pauses: [],
      pausedElapsed: 0,
      secondsElapsed: 0,
      secondsRemaining: this.props.minutes * 60 + this.props.seconds
    });
  };

  /*
   * Stop (Finish) the pomodoro if it is currently running, otherwise
   * start the fresh pomodoro.
   */
  clickStartStop = () => {
    if (this.state.isStarted) {
      this.props.completeSession(this.state);
      this.clickReset();
    } else {
      let timer_id = setInterval(this.tick, 1000);
      this.setState({
        isPaused: false,
        isStarted: true,
        timer: timer_id
      });
    }
  };

  savePause = (description: string) => {
    let paused: PauseState = {
      seconds: this.state.pausedElapsed,
      description: description
    };

    this.state.pauses &&
      this.setState({
        isPaused: false,
        pausedElapsed: 0,
        pauses: [paused, ...this.state.pauses]
      });
  };

  /*
   * With each tick of the timer, adjust the appropriate counters or if the
   * time has ran out then finish the pomodoro.
   */
  tick = () => {
    let remaining = this.state.secondsRemaining;
    if (remaining <= 0) {
      this.clickStartStop();
    } else if (this.state.isStarted && !this.state.isPaused) {
      this.setState(prevState => ({
        secondsElapsed: prevState.secondsElapsed + 1,
        secondsRemaining: prevState.secondsRemaining - 1
      }));
    } else if (this.state.isPaused) {
      this.setState(prevState => ({
        pausedElapsed: prevState.pausedElapsed + 1,
        secondsElapsed: prevState.secondsElapsed + 1
      }));
    }
  };
}
