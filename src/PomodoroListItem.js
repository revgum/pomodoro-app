// @flow
import * as React from "react";
import "./PomodoroListItem.css";
import * as Utils from "./utils";
import type { PauseState } from "./types";
import PauseList from "./PauseList";

// material-ui
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import Delete from "@material-ui/icons/Delete";
import IconButton from "material-ui/IconButton";
import red from "material-ui/colors/red";

type Props = {
  classes: any,
  deletePomodoro: Function,
  id: number,
  isPaused: boolean,
  pauses: Array<PauseState>,
  pausedElapsed: number,
  secondsRemaining: number,
  visible: boolean
};

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit,
    padding: 0
  },
  cardContent: {
    padding: 12
  },
  deleteAction: {
    color: red[500]
  },
  pos: {
    marginBottom: 12
  }
});

class PomodoroListItem extends React.Component<Props> {
  render() {
    return (
      <li className={this.classes()}>
        <Card className={this.props.classes.card}>
          <CardHeader
            className={this.props.classes.cardHeader}
            action={
              <IconButton>
                <Delete
                  className={this.props.classes.deleteAction}
                  onClick={this.deletePomodoro}
                />
              </IconButton>
            }
            title={this.headerTitle()}
          />
          <CardContent className={this.props.classes.cardContent}>
            <PauseList
              isPaused={true}
              pauses={this.props.pauses}
              pausedElapsed={this.props.pausedElapsed}
            />
          </CardContent>
        </Card>
      </li>
    );
  }

  headerTitle = () => {
    if (this.props.secondsRemaining <= 0) return "Complete";
    return `${Utils.formattedTime(this.props.secondsRemaining)} remaining`;
  };

  classes = () => {
    return this.props.visible ? "" : "hidden";
  };

  deletePomodoro = () => {
    this.props.deletePomodoro(this.props);
  };
}

export default withStyles(styles)(PomodoroListItem);
