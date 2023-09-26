import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { isLocal, open } from './url.utils';

describe('isLocal', () => {
    test('local', () => {
        location.replace(new URL('http://ankas.local'));
        expect(isLocal()).toBeTruthy();
    });

    test('test', () => {
        location.replace(new URL('http://ankas.test'));
        expect(isLocal()).toBeTruthy();
    });

    test('noLocal', () => {
        location.replace(new URL('http://ankas.ru'));
        expect(isLocal()).toBeFalsy();
    });
});

describe('open', () => {
    beforeEach(() => {
        vi.stubGlobal('window', {
            open: vi.fn()
        });
    });

    test('file', () => {
        open('http::/test.test');
        expect(window.open).toHaveBeenCalledOnce();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});