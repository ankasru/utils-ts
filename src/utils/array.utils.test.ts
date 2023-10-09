import { describe, expect, test } from 'vitest';
import { at } from './array.utils';

describe('arrayAtPolyfill.helper', () => {
    test('arrayAtPolyfill.helper natural', () => {
        const testArray = [1, 2, 3];
        expect(at(testArray, 1)).toBe(2);
    });

    test('arrayAtPolyfill.helper negative', () => {
        const testArray = [1, 2, 3];
        expect(at(testArray, -2)).toBe(2);
    });

    test('arrayAtPolyfill.helper more than length', () => {
        const testArray = [1, 2, 3];
        expect(at(testArray, -4)).toBe(3);
    });
});
