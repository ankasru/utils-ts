import { describe, expect, test } from 'vitest';
import {
  isEmpty,
  toBoolean,
  toNumber,
  tryOrNull,
  tryOrNullAsync,
} from './helpers.utils';

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

describe('toNumber', () => {
  test('string', () => {
    expect(toNumber(1)).toEqual(1);
  });

  test('string', () => {
    expect(toNumber('1,1')).toEqual(1.1);
  });

  test('boolean', () => {
    expect(toNumber(true)).toEqual(1);
    expect(toNumber(false)).toEqual(0);
  });

  test('NaN', () => {
    expect(Number.isNaN(toNumber({ id: 1 }))).toBeTruthy();
  });
});

describe('toBoolean', () => {
  test('boolean', () => {
    expect(toBoolean(true)).toBeTruthy();
  });

  test('string', () => {
    expect(toBoolean('true')).toBeTruthy();
    expect(toBoolean('abv')).toBeTruthy();
    expect(toBoolean('false')).toBeFalsy();
    expect(toBoolean('')).toBeFalsy();
  });

  test('number', () => {
    expect(toBoolean(1)).toBeTruthy();
    expect(toBoolean(0)).toBeFalsy();
  });

  test('default', () => {
    expect(toBoolean([1])).toBeTruthy();
    expect(toBoolean([])).toBeFalsy();
    expect(toBoolean({ id: 1 })).toBeTruthy();
    expect(toBoolean({})).toBeFalsy();
  });
});

describe('tryOrNull', () => {
  test('return null', () => {
    expect(tryOrNull(() => JSON.parse('{WRONGJSONCODE}'))).toBe(null);
  });

  test('return string', () => {
    expect(tryOrNull(() => JSON.parse('"JSONCODE"'))).toBe('JSONCODE');
  });

  test('return async null', async () => {
    expect(
      await tryOrNullAsync(
        async () => await Promise.resolve(JSON.parse('{WRONGJSONCODE}'))
      )
    ).toBe(null);
  });

  test('return async string', async () => {
    expect(
      await tryOrNullAsync(
        async () => await Promise.resolve(JSON.parse('"JSONCODE"'))
      )
    ).toBe('JSONCODE');
  });
});
