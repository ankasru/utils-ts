import { describe, expect, test } from 'vitest';
import { convert, getThisDate, plusTime } from './date.utils';

describe('convert', () => {
    test('without time', () => {
        expect(convert('2022-10-10 10:10:10')).toEqual('10.10.2022');
    });

    test('with time', () => {
        expect(convert('2022-10-10 10:10:10', { time: true })).toEqual('10.10.2022, 10:10:10');
    });

    test('empty', () => {
        expect(convert('')).toEqual('');
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
});
