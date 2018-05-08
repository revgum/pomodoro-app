// @flow
import * as React from "react";
import "./PauseListItem.css";
import * as Utils from "./utils";

type Props = {
  seconds: number,
  description?: string
};

export default class PauseListItem extends React.Component<Props> {
  render() {
    return (
      <li>
        <span>{Utils.formattedTime(this.props.seconds)} : </span>
        <span>{this.props.description}</span>
      </li>
    );
  }
}
