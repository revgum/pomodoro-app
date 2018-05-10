// @flow
import * as React from "react";
import "./PauseForm.css";
import * as Utils from "./utils";

type Props = {
  isPaused: boolean,
  pausedElapsed: number,
  savePause: Function
};

type State = {
  description: string
};

export default class PauseForm extends React.Component<Props, State> {
  state: State = {
    description: ""
  };
  saveButton: HTMLButtonElement;

  render() {
    if (!this.props.isPaused) return null;
    return (
      <div>
        <span>{Utils.formattedTime(this.props.pausedElapsed)} : </span>
        <input
          autoFocus
          onKeyUp={this.inputKeyUp}
          onChange={this.inputChange}
          value={this.state.description}
          placeholder="Describe why you paused."
        />
        <button onClick={this.save} ref={btn => btn && (this.saveButton = btn)}>
          Save
        </button>
      </div>
    );
  }

  inputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      description: e.currentTarget.value
    });
  };

  inputKeyUp = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") this.saveButton.click();
  };

  save = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.props.savePause(this.state.description || "No description provided.");
    this.setState({
      description: ""
    });
  };
}
