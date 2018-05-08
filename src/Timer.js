// @flow
import * as React from "react";
import "./Timer.css";
import Controls from "./Controls";
import PauseList from "./PauseList";
import type { PauseState, TimerState } from "./types";
import * as Utils from "./utils";

type Props = {
  minutes: number,
  seconds: number,
  completeSession: Function
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
        <PauseList
          isPaused={this.state.isPaused}
          pauses={this.state.pauses}
          pausedElapsed={this.state.pausedElapsed}
          savePause={this.savePause}
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
    this.props.completeSession(this.state);
    this.setState({
      isPaused: false,
      isStarted: false,
      timer: null,
      secondsElapsed: 0,
      secondsRemaining: this.props.minutes * 60 + this.props.seconds
    });
  };

  clickStartStop = () => {
    if (this.state.isStarted) {
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

  tick = () => {
    let remaining = this.state.secondsRemaining;
    if (remaining <= 0) {
      this.clickReset();
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
