export async function wait (ms: number): Promise<void> {
    await new Promise(resolve => { setTimeout(resolve, ms); });
}

export function debounce <T extends CallbackGeneric> ({ callback, timeout = 300 }: { callback: T; timeout?: number }): Callback<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const debounced = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        return await new Promise<ReturnType<T>>((resolve) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                // eslint-disable-next-line n/no-callback-literal
                resolve(<ReturnType<T>>callback(...args));
            }, timeout);
        });
    };

    return debounced;
}

export function throttle <T extends CallbackGeneric> ({ callback, timeout = 300 }: { callback: T; timeout?: number }): Callback<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const throttled: Callback<T> = async (...args) => {
        return await new Promise<ReturnType<T>>((resolve) => {
            if (timer === undefined || timer === null) {
                // eslint-disable-next-line n/no-callback-literal
                resolve(<ReturnType<T>> callback(...args));
                timer = setTimeout(() => { clearTimeout(timer); timer = undefined; }, timeout);
            }
        });
    };

    return throttled;
}

type Callback <T extends CallbackGeneric> = (...args: Parameters<T>) => any;

type CallbackGeneric = (...args: any[]) => any;
