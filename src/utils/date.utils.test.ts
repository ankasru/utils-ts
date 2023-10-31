import { describe, expect, test } from 'vitest';
import { convert, getThisDate, isValid, plusTime } from './date.utils';

const locales = new Intl.Locale('ru', {
    region: 'RU'
});

describe('convert', () => {
    test('without time', () => {
        expect(convert('2022-10-10 10:10:10', { locales })).toEqual('10.10.2022');
    });

    test('with time', () => {
        expect(convert('2022-10-10 10:10:10', { time: true, locales })).toEqual('10.10.2022, 10:10:10');
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
        expect(getThisDate().day).toEqual((new Date()).getDate());
    });
});

describe('plusTime', () => {
    test('one hour', () => {
        const timestamp = '2022-10-10 00:00:00';
        const date = new Date(timestamp);
        const datePlusHours = plusTime(timestamp, { hours: 1 });

        expect(datePlusHours.getHours() - date.getHours()).toEqual(1);
    });

    test('one day', () => {
        const timestamp = '2022-10-10 00:00:00';
        const date = new Date(timestamp);
        const datePlusHours = plusTime(timestamp, { days: 1 });

        expect(datePlusHours.getDate() - date.getDate()).toEqual(1);
    });

    test('one minuter', () => {
        const timestamp = '2022-10-10 00:00:00';
        const date = new Date(timestamp);
        const datePlusHours = plusTime(timestamp, { minutes: 1 });

        expect(datePlusHours.getMinutes() - date.getMinutes()).toEqual(1);
    });
});
