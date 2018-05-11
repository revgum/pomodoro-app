// @flow
import * as React from "react";
import "./PomodoroList.css";
import PomodoroListItem from "./PomodoroListItem";
import type { TimerState } from "./types";

// material-ui
import { withStyles } from "material-ui";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";

type Props = {
  classes: any,
  deletePomodoro: Function,
  pomodoros: Array<TimerState>
};

type State = {
  showAll: boolean
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  listContainer: {
    marginTop: 0
  },
  list: {
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  listHeader: {
    color: "#ccc",
    marginBottom: theme.spacing.unit
  }
});

class PomodoroList extends React.Component<Props, State> {
  static defaultProps = {
    pomodoros: []
  };

  state = {
    showAll: false
  };

  render() {
    return (
      <div className={this.props.classes.listContainer + " pomodoro-list"}>
        <ul className={this.props.classes.list}>
          <li key="toggle" onClick={this.clickShowAll}>
            <Grid
              container
              className={this.props.classes.root}
              alignItems="flex-end"
            >
              <Grid item>
                <h2 className={this.props.classes.listHeader}>Pomodoros</h2>
              </Grid>
              <Grid item>
                {this.props.pomodoros.length > 3 && (
                  <Button
                    color={this.state.showAll ? "default" : "primary"}
                    className={this.props.classes.button}
                    size="small"
                    variant="raised"
                  >
                    {this.state.showAll ? "Less" : "View More"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </li>
          {this.props.pomodoros.map((p, i) => (
            <PomodoroListItem
              key={`pomodoro-${i}`}
              {...p}
              visible={i <= 2 || this.state.showAll}
              deletePomodoro={this.props.deletePomodoro}
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

export default withStyles(styles)(PomodoroList);
