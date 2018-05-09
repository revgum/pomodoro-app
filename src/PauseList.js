// @flow
import * as React from "react";
import "./PauseList.css";
import type { PauseState } from "./types";
import PauseListItem from "./PauseListItem";

type Props = {
  isPaused: boolean,
  pauses?: Array<PauseState>,
  pausedElapsed: number
};

export default class PauseList extends React.Component<Props> {
  static defaultProps = {
    isPaused: false,
    pausedElapsed: 0,
    pauses: []
  };

  render() {
    if (this.props.pauses.length === 0) return null;
    return (
      <div>
        <h2>Paused</h2>
        <ul>
          {this.props.pauses &&
            this.props.pauses.map((p, i) => (
              <PauseListItem key={`p${i}`} {...p} />
            ))}
        </ul>
      </div>
    );
  }
}
