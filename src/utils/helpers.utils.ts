export type Nullable<T> = T | undefined | null;
export type Empty<T> = T & (undefined | null | '' | { length: 0 });
export type Callback <T extends CallbackGeneric> = (...args: Parameters<T>) => any;
export type CallbackGeneric = (...args: any[]) => any;
export type CallbackGenericAsync = (...args: any[]) => Promise<any>;

export function isEmpty <T> (value: T): value is Empty<T> {
    switch (typeof value) {
        case 'string':
            return value.trim() === '';
        case 'object':
            if (Array.isArray(value)) {
                return value.length === 0;
            }
            return value === null || JSON.stringify(value) === '{}';
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
                case '1':
                    return true;
                case 'false':
                case '0':
                    return false;
                default:
                    return !isEmpty(value);
            }
        default:
            return !isEmpty(value);
    }
}

export function tryOrNull <T extends CallbackGeneric | CallbackGenericAsync> (callback: T): ReturnType<T> | null {
    try {
        return callback();
    } catch (err) {
        return null;
    }
}

export async function tryOrNullAsync <T extends CallbackGenericAsync> (callback: T): Promise<Awaited<ReturnType<T>> | null> {
    try {
        return await callback();
    } catch (err) {
        return null;
    }
}
