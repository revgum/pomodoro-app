// Mock the api calls for testing, see ../__mocks__/api.js
jest.mock("../api");

import * as Api from "../api";

it("returns initital state", async () => {
  expect.assertions(1);
  const data = await Api.initialState();
  expect(data).toEqual({ test: "test" });
});

it("errors initital state", async () => {
  expect.assertions(1);
  try {
    const data = await Api.initialState(true);
  } catch (e) {
    expect(e).toEqual(new Error("mocked error"));
  }
});
