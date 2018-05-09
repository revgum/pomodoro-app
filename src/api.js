// @flow
import type { TimerState } from "./types";
const api_host: string =
  process.env.REACT_APP_API_HOST || "http://localhost:3000";

export async function initialState() {
  let response = await fetch(`${api_host}/init`);
  if (response.ok) return await response.json();
  throw new Error(response.status);
}

export async function save(timer_state: TimerState) {
  let response = await fetch(`${api_host}/pomodoros`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pomodoro: timer_state })
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}
