import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { wait } from './async.utils';

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

    afterEach(() => {
        vi.useRealTimers();
    });
});
