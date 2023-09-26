import { describe, expect, test } from 'vitest';
import { isEmpty } from './helpers.utils';

describe('isEmpty', () => {
    test('object', () => {
        expect(isEmpty({})).toBeTruthy();
        expect(isEmpty({ name: 'string' })).toBeFalsy();
    });

    test('array', () => {
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty([{ name: 'string' }])).toBeFalsy();
    });

    test('string', () => {
        expect(isEmpty('  ')).toBeTruthy();
        expect(isEmpty('true')).toBeFalsy();
    });

    test('boolean', () => {
        expect(isEmpty(true)).toBeFalsy();
        expect(isEmpty(false)).toBeFalsy();
    });

    test('number', () => {
        expect(isEmpty(0)).toBeFalsy();
        expect(isEmpty(12)).toBeFalsy();
    });

    test('null', () => {
        expect(isEmpty(null)).toBeTruthy();
    });

    test('undefined', () => {
        expect(isEmpty(undefined)).toBeTruthy();
    });
});
