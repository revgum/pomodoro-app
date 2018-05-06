import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

// Basic test full rendering
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Shallow rendering test
it("renders without crashing", () => {
  shallow(<App />);
});

// Jest matcher test
it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  const welcome = <h1 className="App-Title">Welcome to React</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
  // or use jest-enzyme matchers
  expect(wrapper).toContainReact(welcome);
});

it("renders the snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
