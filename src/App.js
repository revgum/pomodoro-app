// @flow
import React from "react";
import "./App.css";
import Timer from "./Timer";
import PomodoroList from "./PomodoroList";
import type { AppState, TimerState } from "./types";
import { fetchAll, save } from "./api";

// material-ui
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

type Props = {
  classes: any
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class App extends React.Component<Props, AppState> {
  static defaultProps = {};

  state: AppState = {
    pomodoros: [],
    timer: {
      minutes: 25,
      seconds: 0
    }
  };

  componentDidMount() {
    fetchAll()
      .then(pomodoros => this.setState({ pomodoros }))
      .catch(error => console.error("ERROR", error));
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={this.props.classes.paper}>
              <Timer
                {...this.state.timer}
                completeSession={this.completeSession.bind(this)}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={this.props.classes.paper}>
              <PomodoroList pomodoros={this.state.pomodoros} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  completeSession = (timer_state: TimerState) => {
    // TODO: Add some Notification component and related state for success/error to the UI
    save(timer_state)
      .then(pomodoro => {
        this.setState({ pomodoros: [pomodoro, ...this.state.pomodoros] });
      })
      .catch(error => console.error("ERROR", error));
  };
}

export default withStyles(styles)(App);
