// @flow
import * as React from "react";
import "./PauseList.css";
import type { PauseState } from "./types";
import PauseForm from "./PauseForm";
import PauseListItem from "./PauseListItem";

type Props = {
  isPaused: boolean,
  pauses?: Array<PauseState>,
  pausedElapsed: number,
  savePause: Function
};

export default class PauseList extends React.Component<Props> {
  static defaultProps = {
    isPaused: false,
    pausedElapsed: 0,
    pauses: []
  };

  render() {
    return (
      <div>
        <ul>
          <PauseForm
            isPaused={this.props.isPaused}
            pausedElapsed={this.props.pausedElapsed}
            savePause={this.props.savePause}
          />
          {this.props.pauses &&
            this.props.pauses.map((p, i) => (
              <PauseListItem key={`p${i}`} {...p} />
            ))}
        </ul>
      </div>
    );
  }
}
