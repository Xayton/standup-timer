export interface TimerItem {
  name: string;

  seconds: number;
  max: number;
}

export function getUrlQueryParameters() {
  const searchParams = new URLSearchParams(window.location.search);

  const timers: TimerItem[] = [];
  let standupName = "Stand-up timer";
  let random = false;
  let totalTime = 0;
  let timersTotal = 0;

  for (const p of searchParams) {
    const paramName = p[0].trim();
    if (paramName.length > 0) {
      if (paramName === "name") {
        standupName = p[1];
        continue;
      } else if (paramName === "random" && p[1] === "true") {
        random = true;
        continue;
      }

      const seconds = parseInt(p[1]);
      if (isNaN(seconds)) continue;

      if (paramName === "total") {
        totalTime = seconds;
      } else {
        timers.push({ name: paramName, seconds: 0, max: seconds });
        timersTotal += seconds;
      }
    }
  }

  // If the totalTime was not specified, then put the sum of the timers.
  if (totalTime === 0) totalTime = timersTotal;

  return { standupName, totalTime, random, timers };
}
