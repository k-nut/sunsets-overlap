import SunCalc from "suncalc";
import { DateTime, Interval } from "luxon";

export type Location = [number, number];

const range = (count: number): Array<number> => [...Array(count).keys()];

const getSunsetRange = (day: Date, location: Location) => {
  const { sunsetStart, sunset } = SunCalc.getTimes(day, ...location);
  return Interval.fromDateTimes(sunsetStart, sunset);
};

const calculateDays = (firstLocation: Location, secondLocation: Location): Array<Interval> => {
  const start = DateTime.utc(2019, 1, 1);

  const days = range(365).map(day => start.plus({ days: day }));

  const intersections: Array<Interval | null> = days.map(day => {
    const firstRange = getSunsetRange(day.toJSDate(), firstLocation);
    const secondRange = getSunsetRange(day.toJSDate(), secondLocation);
    return firstRange.intersection(secondRange);
  });

  return intersections.filter(i => i !== null) as Array<Interval>;
};

export {calculateDays}
