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
        expect(HTMLSwitcher('Жидкотопливный шланг G 1/4&amp;&quot; - Rp 1/4&amp;&quot; 1000мм', { action: 'remove' })).toEqual('Жидкотопливный шланг G 1/4 - Rp 1/4 1000мм');
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
