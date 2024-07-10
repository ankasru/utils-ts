import {
  toBoolean,
  type CallbackGeneric,
  type Callback,
} from './helpers.utils';

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function debounce<T extends CallbackGeneric>({
  callback,
  timeout = 300,
  initialInvoke,
}: {
  callback: T;
  timeout?: number;
  initialInvoke?: boolean;
}): Callback<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return await new Promise<ReturnType<T>>((resolve) => {
      if (timer !== undefined || !(initialInvoke ?? false)) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          resolve(<ReturnType<T>>callback(...args));
          timer = undefined;
        }, timeout);
      } else {
        resolve(<ReturnType<T>>callback(...args));
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        timer = setTimeout(() => {}, timeout);
      }
    });
  };

  return debounced;
}

export function throttle<T extends CallbackGeneric>({
  callback,
  timeout = 300,
}: {
  callback: T;
  timeout?: number;
}): Callback<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const throttled: Callback<T> = async (...args) => {
    return await new Promise<ReturnType<T>>((resolve) => {
      if (timer === undefined || timer === null) {
        resolve(<ReturnType<T>>callback(...args));
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = undefined;
        }, timeout);
      }
    });
  };

  return throttled;
}

export function setCustomInterval<T extends CallbackGeneric>(
  callback: T,
  timeout: number,
  {
    times,
    initialInvoke,
  }: {
    times?: number | false;
    initialInvoke?: boolean;
  } = {}
): ReturnType<typeof setInterval> {
  const isCounter = toBoolean(times);
  let counter = 0;

  if (initialInvoke ?? false) {
    invokeCallback();
  }

  const intervalId = setInterval(invokeCallback, timeout);

  return intervalId;

  function invokeCallback(): void {
    if (isCounter) {
      if (counter < <number>times) {
        callback();
      } else {
        clearInterval(intervalId);
      }
      counter++;
    } else {
      callback();
    }
  }
}
