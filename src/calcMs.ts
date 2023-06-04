import { Range } from "./types";
import { pipe } from "./function";

type CalcMsSecondUnitType = 
  's' | 'sec' | 'second' | 'seconds';

type CalcMsMinuteUnitType = 
  'm' | 'min' | 'minute' | 'minutes';

type CalcMsHourUnitType = 
  'hr' | 'hrs' | 'hour' | 'hours';

type CalcMsDayUnitType =
  'd' | 'dy' | 'day' | 'days';

type CalcMsWeekUnitType =
  'wk' | 'wks' | 'week' | 'weeks';

type CalcMsTimeStr = 
  | `${Range<1, 60>}${'' | ' '}${CalcMsSecondUnitType}`
  | `${Range<1, 60>}${'' | ' '}${CalcMsMinuteUnitType}`
  | `${Range<1, 24>}${'' | ' '}${CalcMsHourUnitType}`
  | `${Range<1, 7>}${'' | ' '}${CalcMsDayUnitType}`
  | `${Range<1, 4>}${'' | ' '}${CalcMsWeekUnitType}`

export function calcMs<T extends CalcMsTimeStr>(s: T): number {
  const calcFromSeconds = (n: number) => n * 1000;
  const calcFromMinutes = (n: number) => pipe(n * 60, calcFromSeconds);
  const calcFromHours = (n: number) => pipe(n * 60, calcFromMinutes);
  const calcFromDays = (n: number) => pipe(n * 24, calcFromHours);
  const calcFromWeeks = (n: number) => pipe(n * 7, calcFromDays);

  const regex = /^(\d+)(?:\s+)?(.+)$/; // Regex to extract the number and unit

  const matches = s.match(regex);
  if (matches) {
    const [, value, unit] = matches;
    const numericValue = parseInt(value, 10);

    switch (unit) {
      case 's':
      case 'sec':
      case 'second':
      case 'seconds':
        return calcFromSeconds(numericValue);
      case 'm':
      case 'min':
      case 'minute':
      case 'minutes':
        return calcFromMinutes(numericValue);
      case 'hr':
      case 'hrs':
      case 'hour':
      case 'hours':
        return calcFromHours(numericValue);
      case 'd':
      case 'dy':
      case 'day':
      case 'days':
        return calcFromDays(numericValue);
      case 'wk':
      case 'wks':
      case 'week':
      case 'weeks':
        return calcFromWeeks(numericValue);
    }
  }

  throw new Error('Failed to parse given time string!');
}