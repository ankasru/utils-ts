export function at<T>(array: T[], index: number): T {
  const { length } = array;
  const computedIndex = index < 0 ? length + index : index;

  if (computedIndex > length - 1 || computedIndex < 0) {
    return array[length - 1];
  }

  return array[computedIndex];
}

export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
