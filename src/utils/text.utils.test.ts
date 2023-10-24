import { describe, expect, test } from 'vitest';
import { HTMLSwitcher, generateHash } from './text.utils';

describe('htmlSwitcher', () => {
    test('escape', () => {
        expect(HTMLSwitcher('&', { action: 'escape' })).toEqual('&amp;');
    });

    test('unescape', () => {
        expect(HTMLSwitcher('&amp;', { action: 'unescape' })).toEqual('&');
    });

    test('remove', () => {
        expect(HTMLSwitcher('"a&amp;', { action: 'remove' })).toEqual('a');
    });

    test('empty value', () => {
        expect(HTMLSwitcher('', { action: 'escape' })).toEqual('');
        expect(HTMLSwitcher(null, { action: 'escape' })).toEqual(null);
    });
});

describe('generateHash', () => {
    test('length', () => {
        expect(generateHash(2).length).toBe(2);
    });
});
