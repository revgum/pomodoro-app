import React from "react";
import Timer from "../Timer";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

// Shallow rendering test
it("passes a smoke test", () => {
  shallow(<Timer />);
});

it("captures a snapshot", () => {
  const tree = renderer.create(<Timer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("sets a timer interval for counting down the timer", () => {
  jest.useFakeTimers();
  const wrapper = shallow(<Timer />);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

it("defaults to a 25 minute timer", () => {
  const wrapper = shallow(<Timer />);
  expect(wrapper).toContainReact(<div className="timer">25:00</div>);
});

it("renders a specified timer", () => {
  const wrapper = shallow(<Timer minutes={10} seconds={0} />);
  expect(wrapper).toContainReact(<div className="timer">10:00</div>);

  // advance the timer by a tick
  wrapper.setState({ secondsRemaining: 599 });
  expect(wrapper).toContainReact(<div className="timer">09:59</div>);
});

it("renders an hour timer", () => {
  const wrapper = shallow(<Timer minutes={60} seconds={0} />);
  expect(wrapper).toContainReact(<div className="timer">1:00:00</div>);
});

describe("#tick", () => {
  it("decrements the timer", () => {
    const wrapper = shallow(<Timer minutes={10} seconds={0} />);
    const instance = wrapper.instance();
    const tickSpy = jest.spyOn(instance, "tick");
    instance.tick();
    expect(tickSpy).toHaveBeenCalled();
    expect(instance.state.secondsRemaining).toEqual(599);
  });
  it("stops the timer when it reaches 0", () => {
    const wrapper = shallow(<Timer minutes={0} seconds={1} />);
    const instance = wrapper.instance();
    const tickSpy = jest.spyOn(instance, "tick");
    instance.tick();
    expect(tickSpy).toHaveBeenCalled();
    expect(instance.state.secondsRemaining).toEqual(0);
    instance.tick();
    expect(tickSpy).toHaveBeenCalled();
    expect(instance.state.secondsRemaining).toEqual(0);
    expect(instance.state.timer).toEqual(null);
  });
});
