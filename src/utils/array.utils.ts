export function at <T> (array: T[], index: number): T {
    const { length } = array;
    const computedIndex = index < 0 ? length + index : index;

    if (computedIndex > (length - 1) || computedIndex < 0) {
        return array[length - 1];
    }

    return array[computedIndex];
}
