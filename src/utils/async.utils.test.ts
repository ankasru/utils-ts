import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { debounce, throttle, wait } from './async.utils';

describe('wait', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    test('wait return type', () => {
        expect(wait(300)).toBeInstanceOf(Promise);
    });

    test('wait is timeout', () => {
        const spy = vi.spyOn(window, 'setTimeout');
        void wait(300);
        vi.advanceTimersByTime(300);
        expect(spy).toHaveBeenCalledOnce();
    });

    test('debounce', async () => {
        const spy = vi.spyOn(window, 'setTimeout');

        const func = debounce({
            callback (a: number) {
                return a;
            },
            timeout: 300
        });
        void func(1);
        vi.advanceTimersByTime(300);

        expect(spy).toHaveBeenCalledOnce();
    });

    test('throttle', async () => {
        const spy = vi.spyOn(window, 'setTimeout');

        const func = throttle({
            callback (a: number) {
                return a;
            },
            timeout: 300
        });
        void func(1);
        void func(2);
        void func(3);
        vi.advanceTimersByTime(300);

        expect(spy).toHaveBeenCalledOnce();

        void func(4);
        vi.advanceTimersByTime(300);
        expect(spy).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
