// Mock the api calls for testing, see ../__mocks__/api.js
jest.mock("../api");
import { mockData } from "../__mocks__/api";

import React from "react";
import App from "../App";
import Timer from "../Timer";
import { createShallow, createRender } from "material-ui/test-utils";
import renderer from "react-test-renderer";
import * as Api from "../api";

describe("<App />", () => {
  let shallow;
  let render;
  const mockCompleteSession = jest.fn();
  const timerProps = {
    minutes: 25,
    seconds: 0,
    completeSession: mockCompleteSession
  };

  beforeAll(() => {
    shallow = createShallow();
    render = createRender();
  });

  it("passes a smoke test", () => {
    const wrapper = shallow(<App />);
  });

  it("captures a snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("adds a pomodoro to the state", async () => {
    const wrapper = shallow(<App />).dive();
    const instance = wrapper.instance();
    await instance.completeSession(mockData.pomodoros[0]);
    expect(wrapper).toHaveState({
      pomodoros: mockData.pomodoros
    });
  });

  it("renders a timer", () => {
    const wrapper = render(<App />);
    expect(wrapper.find(".timer")).toHaveLength(1);
  });
});
