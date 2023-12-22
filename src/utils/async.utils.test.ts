import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import debounce, { wait } from './async.utils';

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
            callback () {
                return 1;
            },
            timeout: 300
        });
        void func();
        vi.advanceTimersByTime(300);

        expect(spy).toHaveBeenCalledOnce();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
