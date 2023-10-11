export type Nullable<T> = T | undefined | null;

export function isEmpty <T> (value: T): value is NonNullable<T> {
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

export function toNumber (value: unknown): number {
    switch (typeof value) {
        case 'number':
            return value;
        case 'string':
            return toNumberRegExp(value);
        case 'boolean':
            return Number(value);
        default:
            return NaN;
    }
}

function toNumberRegExp (value: string): number {
    return Number(String(value).replace(/[a-z'\s]/ig, '').replace(/,/g, '.').replace(/[.](?=.*[.])/g, ''));
}

export function toBoolean (value: unknown): boolean {
    switch (typeof value) {
        case 'boolean':
            return value;
        case 'number':
            return Boolean(value);
        case 'string':
            switch (value) {
                case 'true':
                    return true;
                case 'false':
                    return false;
                default:
                    return !isEmpty(value);
            }
        default:
            return !isEmpty(value);
    }
}
