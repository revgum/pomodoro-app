// @flow

export type TimerState = {
  id?: number,
  visible?: boolean,
  isPaused: boolean,
  isStarted: boolean,
  minutes: number,
  pauses?: Array<PauseState>,
  pausedElapsed: number,
  seconds: number,
  secondsElapsed: number,
  secondsRemaining: number,
  timer?: IntervalID | null
};

export type PauseState = {
  seconds: number,
  description?: string
};

export type AppState = {
  pomodoros: Array<TimerState>,
  timer: {
    minutes: number,
    seconds: number
  }
};
