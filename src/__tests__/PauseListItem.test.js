import React from "react";
import PauseListItem from "../PauseListItem";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("<PauseListItem />", () => {
  it("passes a smoke test", () => {
    const wrapper = shallow(<PauseListItem />);
  });

  it("captures a snapshot", () => {
    const tree = renderer.create(<PauseListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
