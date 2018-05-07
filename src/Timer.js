// @flow

import * as React from "react";
import "./Timer.css";

type Props = {
  minutes: number,
  seconds: number
};

type State = {
  secondsRemaining: number,
  timer?: IntervalID | null
};

export default class Timer extends React.Component<Props, State> {
  static defaultProps = {
    minutes: 25,
    seconds: 0
  };

  state = {
    secondsRemaining: 25 * 60,
    timer: null
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      secondsRemaining: props.minutes * 60 + props.seconds
    };
  }

  componentDidMount() {
    let timer_id = setInterval(this.tick, 1000);
    this.setState({
      timer: timer_id
    });
  }

  tick = () => {
    let remaining = this.state.secondsRemaining;
    if (remaining > 0) {
      this.setState(prevState => ({
        secondsRemaining: prevState.secondsRemaining - 1
      }));
    } else {
      if (this.state.timer !== null) clearInterval(this.state.timer);
      this.setState({
        timer: null,
        secondsRemaining: 0
      });
    }
  };

  render() {
    return (
      <div className="timer">
        {this.formattedTime(this.state.secondsRemaining)}
      </div>
    );
  }

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
