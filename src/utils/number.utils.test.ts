import { describe, expect, test } from 'vitest';
import { formatFactory } from './number.utils';

describe('format', () => {
    test('ru-RU', () => {
        const ruFormat = formatFactory({
            lang: 'ru-RU',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        expect(ruFormat('123.23')).toEqual('123,23');
    });

    test('en-US', () => {
        const enFormat = formatFactory({
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        expect(enFormat('123, 23')).toEqual('123.23');
    });
});
