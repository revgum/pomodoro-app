// @flow
import * as React from "react";
import "./PomodoroList.css";
import PomodoroListItem from "./PomodoroListItem";

type Props = {
  pomodoros: Array<any>
};

export default class PomodoroList extends React.Component<Props> {
  static defaultProps = {
    pomodoros: []
  };

  render() {
    return (
      <div>
        <ul>
          {this.props.pomodoros.map(p => (
            <PomodoroListItem key={`pomodoro-${p.id}`} {...p} />
          ))}
        </ul>
      </div>
    );
  }
}
