export type Nullable<T> = T | undefined | null;

export function isEmpty (value: unknown): boolean {
    switch (typeof value) {
        case 'string':
            return value.trim() === '';
        case 'object':
            if (Array.isArray(value)) {
                return value.length === 0;
            }
            return value === null || Object.keys(value).length === 0;
        default:
            return value === undefined;
    }
}
