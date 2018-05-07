import React from "react";
import App from "../App";
import Timer from "../Timer";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

// Shallow rendering test
it("passes a smoke test", () => {
  shallow(<App />);
});

// Jest matcher test
it("renders a timer", () => {
  const wrapper = shallow(<App />);
  const timer = <Timer minutes={25} seconds={0} />;
  expect(wrapper).toContainReact(timer);
});

it("captures a snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
