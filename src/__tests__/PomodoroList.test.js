import React from "react";
import PomodoroList from "../PomodoroList";
import { createShallow, createRender } from "material-ui/test-utils";
import renderer from "react-test-renderer";
import PomodoroListItem from "../PomodoroListItem";
import * as mockData from "../__mocks__/data";

describe("<PomodoroList />", () => {
  let shallow;
  let wrapper;
  beforeAll(() => {
    shallow = createShallow();
    wrapper = shallow(<PomodoroList />).dive();
  });

  it("passes a smoke test", () => {
    const wrapper = shallow(<PomodoroList />);
  });

  it("captures a snapshot", () => {
    const tree = renderer.create(<PomodoroList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("toggles showing all pomodoros", () => {
    const instance = wrapper.instance();
    const clickShowAllSpy = jest.spyOn(instance, "clickShowAll");
    expect(wrapper).toHaveState({
      showAll: false
    });
    instance.clickShowAll();
    expect(clickShowAllSpy).toHaveBeenCalled();
    expect(wrapper).toHaveState({
      showAll: true
    });
  });

  describe("with pomodoros", () => {
    let shallow;
    let wrapper;
    let instance;
    beforeAll(() => {
      shallow = createShallow();
      wrapper = shallow(<PomodoroList pomodoros={mockData.pomodoros} />).dive();
      instance = wrapper.instance();
    });

    it("renders a pomodoro list item", () => {
      expect(wrapper.find(PomodoroListItem)).toExist();
    });
    it("hides the ...more list item with fewer than 4 pomodoros", () => {
      const moreListItemSpy = jest.spyOn(instance, "moreListItem");
      expect(wrapper.find(".more")).not.toExist();
      let list_item = instance.moreListItem();
      expect(moreListItemSpy).toHaveBeenCalled();
      expect(list_item).toBeNull();
    });
    it("shows the ...more list item with more than 3 pomodoros", () => {
      const moreListItemSpy = jest.spyOn(instance, "moreListItem");
      let new_wrapper = shallow(
        <PomodoroList
          classes={{}}
          deletePomodoro={jest.fn()}
          pomodoros={mockData.lots_of_pomodoros}
        />
      ).dive();
      expect(new_wrapper.find("li.more.hidden")).not.toExist();
      expect(new_wrapper.find("li.more")).toExist();
    });
  });
});
