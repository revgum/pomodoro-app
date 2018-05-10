import React from "react";
import Controls from "../Controls";
import { createShallow, createRender } from "material-ui/test-utils";
import IconButton from "material-ui/IconButton";
import renderer from "react-test-renderer";

describe("<Controls />", () => {
  let shallow;
  let render;
  const mockPause = jest.fn();
  const mockReset = jest.fn();
  const mockStartStop = jest.fn();
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
    const component = (
      <Controls
        clickPause={mockPause}
        clickReset={mockReset}
        clickStartStop={mockStartStop}
        isPaused={false}
        isStarted={false}
        secondsRemaining={60}
      />
    );

    it("has the start button", () => {
      const wrapper = shallow(component).dive();
      expect(wrapper.find(".start")).toHaveLength(1);
    });

    it("does not have the stop button", () => {
      const wrapper = shallow(component).dive();
      expect(wrapper.find(".stop")).not.toExist();
    });
  });

  describe("when started and paused", () => {
    const component = (
      <Controls
        clickPause={mockPause}
        clickReset={mockReset}
        clickStartStop={mockStartStop}
        isPaused={true}
        isStarted={true}
        secondsRemaining={60}
      />
    );

    it("renders the reset and pause button", () => {
      const wrapper = shallow(component).dive();
      expect(wrapper.find(".reset")).toExist();
      expect(wrapper.find(".pause")).toExist();
    });

    it("renders the start/stop button as started", () => {
      const wrapper = shallow(component).dive();
      expect(wrapper.find(".start")).not.toExist();
      expect(wrapper.find(".stop")).toHaveLength(1);
    });
  });

  describe("handling click events", () => {
    it("calls the pause function", () => {
      const wrapper = shallow(component).dive();
      wrapper.find(".pause").simulate("click");
      expect(mockPause).toHaveBeenCalled();
    });

    it("calls the start/stop function", () => {
      const wrapper = shallow(component).dive();
      wrapper.find(".stop").simulate("click");
      expect(mockStartStop).toHaveBeenCalled();
    });

    it("calls the reset function", () => {
      const wrapper = shallow(component).dive();
      wrapper.find(".reset").simulate("click");
      expect(mockReset).toHaveBeenCalled();
    });
  });
});
