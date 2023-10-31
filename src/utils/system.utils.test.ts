/* eslint-disable @typescript-eslint/ban-ts-comment */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { BIG_DESKTOP_SIZE, DESKTOP_SIZE, MOBILE_SIZE, SMALL_TABLET_SIZE, TABLET_SIZE, getOs, getWindowSizeType, isAndroid, isBigDesktop, isDesktop, isIos, isLinux, isMacOs, isMobile, isSmallTablet, isTablet, isWidows, parseCookies, readFromClipboard, writeToClipboard } from './system.utils';

describe('os', () => {
    beforeEach(() => {
        vi.stubGlobal('window', {
            navigator: {
                userAgent: 'Linux'
            }
        });
    });

    test('getOs linux', () => {
        expect(getOs()).equal('linux');
        // @ts-expect-error
        window.navigator.userAgent = 'Macintosh';
        expect(getOs()).equal('macos');
        // @ts-expect-error
        window.navigator.userAgent = 'Win32';
        expect(getOs()).equal('windows');
        // @ts-expect-error
        window.navigator.userAgent = 'iPhone';
        expect(getOs()).equal('ios');
        // @ts-expect-error
        window.navigator.userAgent = 'Android';
        expect(getOs()).equal('android');
        // @ts-expect-error
        window.navigator.userAgent = 'unknown';
        expect(getOs()).equal('undetermined');
    });

    test('isLinux', () => {
        expect(isLinux()).toBeTruthy();
    });

    test('isMacOs', () => {
        expect(isMacOs()).toBeFalsy();
    });

    test('isWidows', () => {
        expect(isWidows()).toBeFalsy();
    });

    test('isIos', () => {
        expect(isIos()).toBeFalsy();
    });

    test('isAndroid', () => {
        expect(isAndroid()).toBeFalsy();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});

describe('window size', () => {
    beforeEach(() => {
        vi.stubGlobal('window', {
            innerWidth: BIG_DESKTOP_SIZE
        });
    });

    test('getWindowSizeType', () => {
        expect(getWindowSizeType()).toEqual('big-desktop');
        window.innerWidth = DESKTOP_SIZE;
        expect(getWindowSizeType()).equal('desktop');
        window.innerWidth = TABLET_SIZE;
        expect(getWindowSizeType()).equal('tablet');
        window.innerWidth = SMALL_TABLET_SIZE;
        expect(getWindowSizeType()).equal('small-tablet');
        window.innerWidth = MOBILE_SIZE;
        expect(getWindowSizeType()).equal('mobile');
    });

    test('isBigDesktop', () => {
        expect(isBigDesktop()).toBeTruthy();
    });

    test('isDesktop', () => {
        expect(isDesktop()).toBeTruthy();
    });

    test('isTablet', () => {
        expect(isTablet()).toBeFalsy();
    });

    test('isSmallTablet', () => {
        expect(isSmallTablet()).toBeFalsy();
    });

    test('isMobile', () => {
        expect(isMobile()).toBeFalsy();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});

describe('clipboard', () => {
    beforeEach(() => {
        vi.stubGlobal('window', {
            navigator: {
                clipboard: {
                    writeText: vi.fn().mockImplementation(async () => await Promise.resolve(true)),
                    readText: vi.fn().mockImplementation(async () => await Promise.resolve('test'))
                }
            }
        });
    });

    test('copy', async () => {
        expect(await writeToClipboard('123')).toBeTruthy();
    });

    test('read', async () => {
        expect(await readFromClipboard()).toEqual('test');
    });

    test('clipboard is not supported', async () => {
        // @ts-expect-error
        window.navigator.clipboard = undefined;
        expect(await writeToClipboard('123')).toBeFalsy();
        expect(await readFromClipboard()).toBeFalsy();
    });

    test('clipboard error', async () => {
        window.navigator.clipboard.readText = vi.fn().mockImplementation(async () => await Promise.reject(new Error('error')));
        window.navigator.clipboard.writeText = vi.fn().mockImplementation(async () => await Promise.reject(new Error('error')));
        expect(await readFromClipboard()).toBeFalsy();
        expect(await writeToClipboard('123')).toBeFalsy();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});

describe('parse cookies', () => {
    beforeEach(() => {
        vi.stubGlobal('navigator', {
            cookieEnabled: true
        });
    });

    test('empty cookies', () => {
        document.cookie = '';
        const cookies = parseCookies();
        if (cookies !== false) {
            expect(cookies.getCookies('source_advert')).toEqual(undefined);
        }
    });

    test('not empty cookies', () => {
        document.cookie = 'source_advert=1;';
        const cookies = parseCookies();
        if (cookies !== false) {
            expect(cookies.getCookies('source_advert')).toEqual('1');
        }
    });

    test('set cookies', () => {
        const cookies = parseCookies();
        if (cookies !== false) {
            cookies.setCookie({
                name: 'source_advert',
                value: '1'
            });
            cookies.setCookie({
                name: 'source_advert',
                value: '2',
                expAt: '2022-10-10 00:00:00'
            });
            cookies.setCookie({
                name: 'source_advert',
                value: '2',
                expAt: new Date()
            });
            cookies.setCookie({
                name: 'source_advert',
                value: '2',
                expAt: { days: 2 }
            });
            expect(cookies.getCookies('source_advert')).toEqual('2');
        }
    });

    test('remove cookies', () => {
        const cookies = parseCookies();
        if (cookies !== false) {
            cookies.setCookie({
                name: 'source_advert',
                value: '1'
            });
            cookies.removeCookie('source_advert');
            expect(cookies.getCookies('source_advert')).toEqual(undefined);
        }
    });

    test('cookies disable', () => {
        // @ts-expect-error
        navigator.cookieEnabled = false;
        expect(parseCookies()).toEqual(false);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });
});
