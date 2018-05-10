// @flow
import * as React from "react";
import "./PomodoroList.css";
import PomodoroListItem from "./PomodoroListItem";
import type { TimerState } from "./types";

type Props = {
  pomodoros: Array<TimerState>
};

type State = {
  showAll: boolean
};

export default class PomodoroList extends React.Component<Props, State> {
  static defaultProps = {
    pomodoros: []
  };

  state = {
    showAll: false
  };

  render() {
    return (
      <div className="pomodoro-list">
        <ul>
          <li key="toggle" className="list-toggle" onClick={this.clickShowAll}>
            Display {this.state.showAll ? "Last 3" : "All"}
          </li>
          {this.props.pomodoros.map((p, i) => (
            <PomodoroListItem
              key={`pomodoro-${i}`}
              {...p}
              visible={i <= 2 || this.state.showAll}
            />
          ))}
          {this.moreListItem()}
        </ul>
      </div>
    );
  }

  clickShowAll = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  };

  moreListItem = () => {
    if (this.props.pomodoros.length <= 3) return null;
    return (
      <li key="more" className={`more ${this.state.showAll ? "hidden" : ""}`}>
        {`... ${this.props.pomodoros.length - 3} more`}
      </li>
    );
  };
}
