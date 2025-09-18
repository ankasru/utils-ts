import { describe, expect, test } from 'vitest';
import { at, chunk } from './array.utils';

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

describe('chunk', () => {
  test('Разбил массив на чанки с остатком', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('Вернул пустой массив, если пришел пустой', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  test('Если длина массива меньше размера чанка, то возвращается массив с одним элементом', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });
});
