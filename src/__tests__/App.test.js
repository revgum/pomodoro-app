// Mock the api calls for testing, see ../__mocks__/api.js
jest.mock("../api");
import * as mockData from "../__mocks__/data";

import React from "react";
import App from "../App";
import Timer from "../Timer";
import { createShallow, createRender } from "material-ui/test-utils";
import renderer from "react-test-renderer";
import * as Api from "../api";

const mockCompleteSession = jest.fn();
const timerProps = {
  minutes: 25,
  seconds: 0,
  completeSession: mockCompleteSession
};

describe("<App />", () => {
  let shallow;
  let render;
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

  it("renders a timer", () => {
    const wrapper = render(<App />);
    expect(wrapper.find(".timer")).toHaveLength(1);
  });

  //TODO: mock fetchAll to error during componentDidMount and
  // check that an error is handled
  it("errors when fetching all", () => {
    const wrapper = shallow(<App />).dive();
  });

  describe("#deletePomodoro", () => {
    let shallow;
    let wrapper;
    let instance;
    beforeAll(() => {
      shallow = createShallow();
      wrapper = shallow(<App />).dive();
      instance = wrapper.instance();
    });

    it("removes a pomodoro from the state", async () => {
      await instance.deletePomodoro(mockData.pomodoros[0]);
      expect(wrapper).toHaveState({ pomodoros: [] });
    });
    //TODO: mock destroy to throw an error
    it("errors", async () => {
      await instance.deletePomodoro(mockData.pomodoros[0]);
      expect(wrapper).toHaveState({ pomodoros: [] });
    });
  });

  describe("#completePomodoro", () => {
    let shallow;
    let wrapper;
    let instance;
    beforeAll(() => {
      shallow = createShallow();
      wrapper = shallow(<App />).dive();
      instance = wrapper.instance();
    });

    it("adds a pomodoro to the state", async () => {
      await instance.completePomodoro(mockData.pomodoros[0]);
      expect(wrapper).toHaveState({
        pomodoros: mockData.pomodoros
      });
    });

    //TODO: mock complete to throw an error
    it("errors", async () => {
      await instance.completePomodoro(mockData.pomodoros[0]);
      expect(wrapper).toHaveState({
        pomodoros: [mockData.pomodoros[0], mockData.pomodoros[0]]
      });
    });
  });
});
