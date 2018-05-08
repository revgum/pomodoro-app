// @flow

export function formattedTime(seconds: number): string {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;
  let ret = "";
  if (hrs > 0) ret += `${hrs}:`;
  ret += mins < 10 ? `0${mins}:` : `${mins}:`;
  ret += secs < 10 ? `0${secs}` : secs;
  return ret;
}
