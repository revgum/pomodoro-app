import React from "react";
import PomodoroListItem from "../PomodoroListItem";
import { createShallow, createRender } from "material-ui/test-utils";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import * as mockData from "../__mocks__/data";
import shadows from "material-ui/styles/shadows";
import Card, { CardContent, CardHeader } from "material-ui/Card";

describe("<PomodoroListItem />", () => {
  let shallow;
  let wrapper;
  let instance;
  beforeAll(() => {
    shallow = createShallow();
    wrapper = shallow(<PomodoroListItem deletePomodoro={jest.fn()} />).dive();
    instance = wrapper.instance();
  });

  it("passes a smoke test", () => {
    const wrapper = shallow(<PomodoroListItem />);
  });

  it("captures a snapshot", () => {
    const tree = renderer.create(<PomodoroListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("deletes this pomodoro", () => {
    let mounted = mount(<PomodoroListItem deletePomodoro={jest.fn()} />);
    mounted.find("button").simulate("click");
    //TODO: test that the button was clicked and deletePomodoro was called
  });
  it("displays a complete pomodoro", () => {
    let mounted = mount(
      <PomodoroListItem deletePomodoro={jest.fn()} secondsRemaining={0} />
    );
    let header = mounted.find(CardHeader);
    expect(header.find({ title: "Complete" })).toExist();
  });
  it("displays a pomodoro with time remaining", () => {
    let mounted = mount(
      <PomodoroListItem deletePomodoro={jest.fn()} secondsRemaining={1} />
    );
    let header = mounted.find(CardHeader);
    expect(header.find({ title: "00:01 remaining" })).toExist();
  });
});
