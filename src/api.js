// @flow
import type { TimerState } from "./types";

export async function initialState() {
  let response = await fetch("/api/state/init");
  if (response.ok) return await response.json();
  throw new Error(response.status);
}

export async function save(timer_state: TimerState) {
  let response = await fetch("/api/timer", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(timer_state)
  });
  if (response.ok) return await response.json();
  throw new Error(response.status);
}
