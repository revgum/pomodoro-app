import React from "react";
import Timer from "../Timer";
import Controls from "../Controls";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

const mockCompletePomodoro = jest.fn();
const timerProps = {
  minutes: 25,
  seconds: 0,
  completePomodoro: mockCompletePomodoro
};

// Shallow rendering test
it("passes a smoke test", () => {
  shallow(<Timer {...timerProps} />);
});

it("captures a snapshot", () => {
  const tree = renderer.create(<Timer {...timerProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("sets a timer interval for counting down the timer", () => {
  jest.useFakeTimers();
  const wrapper = shallow(<Timer {...timerProps} />);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

it("defaults to a 25 minute timer", () => {
  const wrapper = shallow(<Timer {...timerProps} />);
  expect(wrapper).toContainReact(<div className="remaining">25:00</div>);
});

it("renders a specified timer", () => {
  const props = Object.assign({}, timerProps, { minutes: 10 });
  const wrapper = shallow(<Timer {...props} />);
  expect(wrapper).toContainReact(<div className="remaining">10:00</div>);

  // advance the timer by a tick
  wrapper.setState({ secondsRemaining: 599 });
  expect(wrapper).toContainReact(<div className="remaining">09:59</div>);
});

it("renders an hour timer", () => {
  const props = Object.assign({}, timerProps, { minutes: 60 });
  const wrapper = shallow(<Timer {...props} />);
  expect(wrapper).toContainReact(<div className="remaining">1:00:00</div>);
});

describe("#tick", () => {
  it("decrements the timer and increments elapsed time", () => {
    const props = Object.assign({}, timerProps, { minutes: 10 });
    const wrapper = shallow(<Timer {...props} />);
    const instance = wrapper.instance();
    const tickSpy = jest.spyOn(instance, "tick");
    instance.tick();
    expect(tickSpy).toHaveBeenCalled();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: true,
      secondsElapsed: 1,
      secondsRemaining: 599
    });
  });
  it("stops and resets the timer when it reaches 0", () => {
    const props = Object.assign({}, timerProps, { minutes: 0, seconds: 1 });
    const wrapper = shallow(<Timer {...props} />);
    const instance = wrapper.instance();
    const tickSpy = jest.spyOn(instance, "tick");
    const resetSpy = jest.spyOn(instance, "clickReset");
    const completePomodoroSpy = jest.spyOn(instance.props, "completePomodoro");

    // Tick the timer for the final second
    instance.tick();
    expect(tickSpy).toHaveBeenCalled();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: true,
      secondsElapsed: 1,
      secondsRemaining: 0
    });

    // Tick the timer after time has expired
    instance.tick();
    expect(tickSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
    expect(completePomodoroSpy).toHaveBeenCalled();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: false,
      secondsElapsed: 0,
      secondsRemaining: 1,
      timer: null
    });
  });
});

describe("#clickPause", () => {
  const props = Object.assign({}, timerProps, { minutes: 0, seconds: 1 });
  const wrapper = shallow(<Timer {...props} />);
  const instance = wrapper.instance();
  const tickSpy = jest.spyOn(instance, "tick");
  const pauseSpy = jest.spyOn(instance, "clickPause");

  it("pauses the timer and increments the elapsed time", () => {
    expect(wrapper).toHaveState({
      isPaused: false
    });

    instance.clickPause();
    expect(pauseSpy).toHaveBeenCalled();
    instance.tick();
    expect(wrapper).toHaveState({
      isPaused: true,
      secondsElapsed: 1
    });
  });
});

describe("#clickReset", () => {
  const props = Object.assign({}, timerProps, { minutes: 0, seconds: 1 });
  const wrapper = shallow(<Timer {...props} />);
  const instance = wrapper.instance();
  const tickSpy = jest.spyOn(instance, "tick");
  const resetSpy = jest.spyOn(instance, "clickReset");
  const completePomodoroSpy = jest.spyOn(instance.props, "completePomodoro");

  it("resets the timer", () => {
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: true,
      secondsElapsed: 0,
      secondsRemaining: 1
    });

    instance.clickReset();
    expect(resetSpy).toHaveBeenCalled();
    expect(completePomodoroSpy).toHaveBeenCalled();
    instance.tick();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: false,
      timer: null,
      secondsElapsed: 0,
      secondsRemaining: 1
    });
  });
});

describe("#clickStartStop", () => {
  const props = Object.assign({}, timerProps, { minutes: 0, seconds: 1 });
  const wrapper = shallow(<Timer {...props} />);
  const instance = wrapper.instance();
  const tickSpy = jest.spyOn(instance, "tick");
  const startStopSpy = jest.spyOn(instance, "clickStartStop");
  const resetSpy = jest.spyOn(instance, "clickReset");
  const completePomodoroSpy = jest.spyOn(instance.props, "completePomodoro");

  it("stops and resets a timer that is running", () => {
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: true,
      secondsElapsed: 0,
      secondsRemaining: 1
    });

    instance.clickStartStop();
    expect(startStopSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
    expect(completePomodoroSpy).toHaveBeenCalled();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: false,
      timer: null,
      secondsElapsed: 0,
      secondsRemaining: 1
    });
  });

  it("starts a timer that was reset", () => {
    instance.clickReset();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: false,
      timer: null,
      secondsElapsed: 0,
      secondsRemaining: 1
    });

    instance.clickStartStop();
    expect(startStopSpy).toHaveBeenCalled();
    expect(wrapper).toHaveState({
      isPaused: false,
      isStarted: true,
      secondsElapsed: 0,
      secondsRemaining: 1
    });
  });

  describe("#savePause", () => {
    const props = Object.assign({}, timerProps, {
      minutes: 0,
      seconds: 2
    });
    const wrapper = shallow(<Timer {...props} />);
    const instance = wrapper.instance();
    const savePauseSpy = jest.spyOn(instance, "savePause");
    const pauseSpy = jest.spyOn(instance, "clickPause");

    it("saves a pause", () => {
      instance.clickPause();
      expect(pauseSpy).toHaveBeenCalled();

      expect(wrapper).toHaveState({
        isPaused: true,
        isStarted: true,
        secondsElapsed: 0,
        secondsRemaining: 2
      });

      instance.tick();

      instance.savePause("test");
      expect(savePauseSpy).toHaveBeenCalled();
      expect(wrapper).toHaveState({
        isPaused: false,
        isStarted: true,
        secondsRemaining: 2,
        pauses: [{ seconds: 1, description: "test" }]
      });
    });
  });
});
