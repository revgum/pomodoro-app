// @flow

export type TimerState = {
  isPaused: boolean,
  isStarted: boolean,
  minutes: number,
  seconds: number,
  secondsElapsed: number,
  secondsRemaining: number,
  timer?: IntervalID | null
};

export type AppState = {
  pomodoros: Array<TimerState>,
  timer: {
    minutes: number,
    seconds: number
  }
};
