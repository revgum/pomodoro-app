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
        <IconButton
          aria-label="Pause"
          className={this.props.classes.button}
          disabled={this.props.isPaused || !this.props.isStarted}
          onClick={this.props.clickPause}
        >
          <PauseCircleOutline />
        </IconButton>
        <IconButton
          aria-label="Restart"
          className={this.props.classes.button}
          disabled={!this.props.isStarted}
          onClick={this.props.clickReset}
        >
          <RepeatOne />
        </IconButton>
      </div>
    );
  }

  startStopButton = () => {
    if (this.props.isStarted) {
      return (
        <IconButton
          aria-label="Stop"
          className={this.props.classes.button}
          onClick={this.props.clickStartStop}
        >
          <AlarmOff />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label="Start"
          className={this.props.classes.button}
          onClick={this.props.clickStartStop}
        >
          <PlayCircleOutline />
        </IconButton>
      );
    }
  };
}

export default withStyles(styles)(Controls);
