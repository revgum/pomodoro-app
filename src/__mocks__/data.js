export const pomodoros = [
  {
    id: 1,
    visible: true,
    classes: {},
    isPaused: false,
    isStarted: true,
    seconds: 0,
    minutes: 25,
    pauses: [],
    pausedElapsed: 0,
    secondsElapsed: 0,
    secondsRemaining: 25 * 60,
    timer: null
  }
];

export const lots_of_pomodoros = [
  pomodoros[0],
  Object.assign({}, pomodoros[0], { id: 2 }),
  Object.assign({}, pomodoros[0], { id: 3 }),
  Object.assign({}, pomodoros[0], { id: 4 })
];
