import React from "react";
import App from "../App";
import Timer from "../Timer";
import { shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";

const mockCompleteSession = jest.fn();
const timerProps = {
  minutes: 25,
  seconds: 0,
  completeSession: mockCompleteSession
};

// Shallow rendering test
it("passes a smoke test", () => {
  shallow(<App />);
});

// Jest matcher test
it("renders a timer", () => {
  const wrapper = render(<App />);
  expect(wrapper.find(".timer")).toHaveLength(1);
});

it("captures a snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("adds a pomodoro to the state", () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  instance.completeSession({ bogus: 1 });
  expect(wrapper).toHaveState({
    pomodoros: [{ bogus: 1 }]
  });
});
