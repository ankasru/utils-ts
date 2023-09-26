import { describe, expect, test } from 'vitest';
import { convert, getThisDate } from './date.utils';

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
