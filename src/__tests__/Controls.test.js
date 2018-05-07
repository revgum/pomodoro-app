import React from "react";
import Controls from "../Controls";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

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
  expect(wrapper.find("li.pause")).not.toMatchSelector(".disabled");
  expect(wrapper.find("li.pause")).toMatchSelector(".enabled");
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

  it("has two buttons", () => {
    expect(wrapper.find("li")).toHaveLength(2);
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

  it("has three buttons", () => {
    expect(wrapper.find("li")).toHaveLength(3);
  });

  it("renders the reset button", () => {
    expect(wrapper.find("li.reset")).toExist();
  });

  it("renders the start/stop button as started", () => {
    expect(wrapper.find("li.start")).not.toMatchSelector(".stopped");
    expect(wrapper.find("li.start")).toMatchSelector(".started");
  });

  it("renders the pause button as enabled", () => {
    expect(wrapper.find("li.pause")).not.toMatchSelector(".disabled");
    expect(wrapper.find("li.pause")).toMatchSelector(".enabled");
    expect(wrapper.find("li.pause")).toMatchSelector(".paused");
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
