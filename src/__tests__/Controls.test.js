import React from "react";
import Controls from "../Controls";
import { createShallow, createRender } from "material-ui/test-utils";
import IconButton from "material-ui/IconButton";
import renderer from "react-test-renderer";

const mockPause = jest.fn();
const mockReset = jest.fn();
const mockStartStop = jest.fn();

describe("<Controls />", () => {
  let shallow;
  let render;
  const component = (
    <Controls
      clickPause={mockPause}
      clickReset={mockReset}
      clickStartStop={mockStartStop}
      isPaused={false}
      isStarted={true}
      secondsRemaining={60}
    />
  );

  beforeAll(() => {
    shallow = createShallow();
    render = createRender();
  });

  it("passes a smoke test", () => {
    shallow(component);
  });

  it("captures a snapshot", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders three buttons when started", () => {
    const wrapper = shallow(component).dive();
    expect(wrapper.find(IconButton)).toHaveLength(3);
    expect(wrapper.find(".stop")).toHaveLength(1);
  });

  describe("when stopped", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <Controls
          clickPause={mockPause}
          clickReset={mockReset}
          clickStartStop={mockStartStop}
          isPaused={false}
          isStarted={false}
          secondsRemaining={60}
        />
      ).dive();
    });

    it("has the start button", () => {
      expect(wrapper.find(".start")).toHaveLength(1);
    });

    it("does not have the stop button", () => {
      expect(wrapper.find(".stop")).not.toExist();
    });
  });

  describe("when started and paused", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <Controls
          clickPause={mockPause}
          clickReset={mockReset}
          clickStartStop={mockStartStop}
          isPaused={true}
          isStarted={true}
          secondsRemaining={60}
        />
      ).dive();
    });

    it("renders the reset and pause button", () => {
      expect(wrapper.find(".reset")).toExist();
      expect(wrapper.find(".pause")).toExist();
    });

    it("renders the stop button and not the start button", () => {
      expect(wrapper.find(".start")).not.toExist();
      expect(wrapper.find(".stop")).toHaveLength(1);
    });
  });

  describe("handling click events", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(component).dive();
    });
    it("calls the pause function", () => {
      wrapper.find(".pause").simulate("click");
      expect(mockPause).toHaveBeenCalled();
    });

    it("calls the start/stop function", () => {
      wrapper.find(".stop").simulate("click");
      expect(mockStartStop).toHaveBeenCalled();
    });

    it("calls the reset function", () => {
      wrapper.find(".reset").simulate("click");
      expect(mockReset).toHaveBeenCalled();
    });
  });
});
