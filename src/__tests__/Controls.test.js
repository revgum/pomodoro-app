import React from "react";
import Controls from "../Controls";
import { createShallow, getClasses } from "material-ui/test-utils";
//import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("<Controls />", () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const mockPause = jest.fn();
  const mockReset = jest.fn();
  const mockStartStop = jest.fn();
  const component = shallow(
    <Controls
      clickPause={mockPause}
      clickReset={mockReset}
      clickStartStop={mockStartStop}
      isPaused={false}
      isStarted={true}
      secondsRemaining={60}
    />
  );

  it("passes a smoke test", () => {
    shallow(component);
  });

  it("captures a snapshot", () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders three buttons when started", () => {
    const wrapper = shallow(component);
    expect(wrapper.find("li")).toHaveLength(3);
    expect(wrapper.find("li.start")).toMatchSelector(".started");
    expect(wrapper.find("li.pause")).not.toMatchSelector(".paused");
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
    const wrapper = shallow(component);

    it("has the start button", () => {
      expect(wrapper.find("li")).toHaveLength(1);
    });

    it("does not render the reset button", () => {
      expect(wrapper.find("li.reset")).not.toExist();
    });

    it("does not render the start/stop button as started", () => {
      expect(wrapper.find("li.start")).toMatchSelector(".stopped");
      expect(wrapper.find("li.start")).not.toMatchSelector(".started");
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
    const wrapper = shallow(component);

    it("has start and reset buttons", () => {
      expect(wrapper.find("li.start")).toHaveLength(1);
      expect(wrapper.find("li.reset")).toHaveLength(1);
    });

    it("renders the reset button", () => {
      expect(wrapper.find("li.reset")).toExist();
    });

    it("renders the start/stop button as started", () => {
      expect(wrapper.find("li.start")).not.toMatchSelector(".stopped");
      expect(wrapper.find("li.start")).toMatchSelector(".started");
    });

    it("does not render the pause button", () => {
      expect(wrapper.find("li.pause")).not.toExist();
    });
  });

  describe("handling click events", () => {
    const wrapper = shallow(component);

    it("calls the pause function", () => {
      wrapper.find("li.pause").simulate("click");
      expect(mockPause).toHaveBeenCalled();
    });

    it("calls the start/stop function", () => {
      wrapper.find("li.start").simulate("click");
      expect(mockStartStop).toHaveBeenCalled();
    });

    it("calls the reset function", () => {
      wrapper.find("li.reset").simulate("click");
      expect(mockReset).toHaveBeenCalled();
    });
  });
});
