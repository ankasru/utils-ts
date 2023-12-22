export async function wait (ms: number): Promise<void> {
    await new Promise(resolve => { setTimeout(resolve, ms); });
}

export function debounce <T extends (...args: any[]) => any> ({ callback, timeout = 300 }: { callback: T; timeout?: number }): (...args: Parameters<T>) => Promise<ReturnType<T>> {
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
