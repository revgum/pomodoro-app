// @flow

import * as React from "react";
import "./Timer.css";
import Controls from "./Controls";

type Props = {
  minutes: number,
  seconds: number
};

type State = {
  isPaused: boolean,
  isStarted: boolean,
  secondsElapsed: number,
  secondsRemaining: number,
  timer?: IntervalID | null
};

export default class Timer extends React.Component<Props, State> {
  static defaultProps = {
    minutes: 25,
    seconds: 0
  };

  state = {
    isPaused: false,
    isStarted: true,
    secondsElapsed: 0,
    secondsRemaining: 25 * 60,
    timer: null
  };

  constructor(props: Props) {
    super(props);
    this.state = Object.assign(this.state, {
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
          {this.formattedTime(this.state.secondsRemaining)}
        </div>
        <Controls
          clickPause={this.clickPause}
          clickReset={this.clickReset}
          clickStartStop={this.clickStartStop}
          isPaused={this.state.isPaused}
          isStarted={this.state.isStarted}
          secondsRemaining={this.state.secondsRemaining}
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

  tick = () => {
    let remaining = this.state.secondsRemaining;
    if (remaining <= 0) {
      if (this.state.timer !== null) clearInterval(this.state.timer);
      // TODO: Timer ran out
      //  - Log the pomodoro
      //  - Stop the clock
      // Reset the timer
      this.setState({
        isPaused: false,
        isStarted: false,
        timer: null,
        secondsElapsed: 0,
        secondsRemaining: 0
      });
    } else if (this.state.isStarted && !this.state.isPaused) {
      this.setState(prevState => ({
        secondsElapsed: prevState.secondsElapsed + 1,
        secondsRemaining: prevState.secondsRemaining - 1
      }));
    } else if (this.state.isPaused) {
      this.setState(prevState => ({
        secondsElapsed: prevState.secondsElapsed + 1
      }));
    }
  };

  formattedTime = (seconds: number) => {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    let ret = "";
    if (hrs > 0) ret += `${hrs}:`;
    ret += mins < 10 ? `0${mins}:` : `${mins}:`;
    ret += secs < 10 ? `0${secs}` : secs;
    return ret;
  };
}
