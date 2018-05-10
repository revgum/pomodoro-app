// @flow
import * as React from "react";
import "./Controls.css";

// material-ui
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import AlarmOff from "@material-ui/icons/AlarmOff";
import PauseCircleOutline from "@material-ui/icons/PauseCircleOutline";
import RepeatOne from "@material-ui/icons/RepeatOne";

type Props = {
  classes: any,
  clickPause: Function,
  clickReset: Function,
  clickStartStop: Function,
  isPaused: boolean,
  isStarted: boolean,
  secondsRemaining: number
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Controls extends React.Component<Props> {
  render() {
    return (
      <div className="timer-controls">
        {this.startStopButton()}
        {!this.props.isPaused &&
          this.props.isStarted && (
            <IconButton
              onClick={this.props.clickPause}
              className={this.props.classes.button}
              aria-label="Pause"
            >
              <PauseCircleOutline />
            </IconButton>
          )}
        {this.props.isStarted && (
          <IconButton
            onClick={this.props.clickReset}
            className={this.props.classes.button}
            aria-label="Restart"
          >
            <RepeatOne />
          </IconButton>
        )}
      </div>
    );
  }

  startStopButton = () => {
    if (this.props.isStarted) {
      return (
        <IconButton
          className={this.props.classes.button}
          aria-label="Stop"
          onClick={this.props.clickStartStop}
        >
          <AlarmOff />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          className={this.props.classes.button}
          aria-label="Start"
          onClick={this.props.clickStartStop}
        >
          <PlayCircleOutline />
        </IconButton>
      );
    }
  };
}

export default withStyles(styles)(Controls);
