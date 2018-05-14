import { isNullOrUndefined } from "util";

const mockInitialState = {
  test: "test"
};

export async function initialState(error) {
  if (!error) return mockInitialState;
  throw new Error("mocked error");
}

export async function save(timer_state, error) {
  if (!error) return timer_state;
  throw new Error("mocked save error");
}

export async function fetchAll(error) {
  if (!error) return [];
  throw new Error("mocked fetchAll error");
}

export async function destroy(timer_state, error) {
  if (!error) return timer_state;
  throw new Error("mocked destroy error");
}
