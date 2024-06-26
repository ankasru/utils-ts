import { describe, expect, test } from 'vitest';
import {
  convert,
  daysToMilliseconds,
  getDiff,
  getThisDate,
  hoursToMilliseconds,
  isValid,
  minutesToMilliseconds,
  monthsToMilliseconds,
  plusTime,
  secondsToMilliseconds,
  weeksToMilliseconds,
  yearsToMilliseconds,
} from './date.utils';

const locales = new Intl.Locale('ru', {
  region: 'RU',
});

describe('convert', () => {
  test('without time', () => {
    expect(convert('2022-10-10 10:10:10', { locales })).toEqual(
      '10.10.2022'
    );
  });

  test('with time', () => {
    expect(convert('2022-10-10 10:10:10', { time: true, locales })).toEqual(
      '10.10.2022, 10:10:10'
    );
  });

  test('empty', () => {
    expect(convert('')).toEqual('');
  });

  test('wrong date', () => {
    expect(convert('0000-00-00 00:00:00')).toEqual('');
  });
});

describe('isValid', () => {
  test('valid', () => {
    expect(isValid(new Date())).toBeTruthy();
  });

  test('invalid', () => {
    expect(isValid(new Date('0000-00-00 00:00:00'))).toBeFalsy();
  });
});

describe('getThisDate', () => {
  test('today', () => {
    expect(getThisDate().day).toEqual(new Date().getDate());
  });
});

describe('plusTime', () => {
  const date = new Date('2022-10-10 00:00:00');

  test('one year', () => {
    const datePlusHours = plusTime(date, { years: 1 });

    expect(datePlusHours.getFullYear() - date.getFullYear()).toEqual(1);
  });

  test('one month', () => {
    const datePlusHours = plusTime(date, { months: 1 });

    expect(datePlusHours.getMonth() - date.getMonth()).toEqual(1);
  });

  test('one week', () => {
    const datePlusHours = plusTime(date, { weeks: 1 });

    expect(datePlusHours.getDate() - date.getDate()).toEqual(7);
  });

  test('one day', () => {
    const datePlusHours = plusTime(date, { days: 1 });

    expect(datePlusHours.getDate() - date.getDate()).toEqual(1);
  });

  test('one hour', () => {
    const datePlusHours = plusTime(date, { hours: 1 });

    expect(datePlusHours.getHours() - date.getHours()).toEqual(1);
  });

  test('one minute', () => {
    const datePlusHours = plusTime(date, { minutes: 1 });

    expect(datePlusHours.getMinutes() - date.getMinutes()).toEqual(1);
  });
});

describe('getDiff', () => {
  test('one day less first', () => {
    expect(
      getDiff(
        new Date('2023-01-02 00:00:00'),
        new Date('2023-01-03 00:00:00')
      )
    ).equal(daysToMilliseconds(1));
  });

  test('one day more first', () => {
    expect(
      getDiff(
        new Date('2023-01-03 00:00:00'),
        new Date('2023-01-02 00:00:00')
      )
    ).equal(daysToMilliseconds(1));
  });
});

describe('to milliseconds', () => {
  test('years to milliseconds', () => {
    expect(yearsToMilliseconds(1)).equal(31536000000);
  });

  test('months to milliseconds', () => {
    expect(monthsToMilliseconds(1)).equal(2419200000);
  });

  test('weeks to milliseconds', () => {
    expect(weeksToMilliseconds(1)).equal(604800000);
  });

  test('days to milliseconds', () => {
    expect(daysToMilliseconds(1)).equal(86400000);
  });

  test('hours to milliseconds', () => {
    expect(hoursToMilliseconds(1)).equal(3600000);
  });

  test('minutes to milliseconds', () => {
    expect(minutesToMilliseconds(1)).equal(60000);
  });

  test('seconds to milliseconds', () => {
    expect(secondsToMilliseconds(1)).equal(1000);
  });
});
