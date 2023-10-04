export function getOs (): OS {
    if (isWidows()) {
        return 'windows';
    }
    if (isMacOs()) {
        return 'macos';
    }
    if (isAndroid()) {
        return 'android';
    }
    if (isIos()) {
        return 'ios';
    }
    if (isLinux()) {
        return 'linux';
    }
    return 'undetermined';
}

export function isMacOs (): boolean {
    const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
    return testUserAgent(macosPlatforms);
}

export function isWidows (): boolean {
    const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
    return testUserAgent(windowsPlatforms);
}

export function isIos (): boolean {
    const iosPlatforms = /(iPhone)|(iPad)|(iPod)/i;
    return testUserAgent(iosPlatforms);
}

export function isAndroid (): boolean {
    const androidPlatforms = /(Android)/i;
    return testUserAgent(androidPlatforms);
}

export function isLinux (): boolean {
    const linuxPlatforms = /(Linux)/i;
    return testUserAgent(linuxPlatforms);
}

function testUserAgent (platforms: RegExp): boolean {
    return platforms.test(window.navigator.userAgent);
}

type OS = 'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux';

export function getWindowSizeType (): WindowSizes {
    if (isBigDesktop()) {
        return 'big-desktop';
    }
    if (isDesktop()) {
        return 'desktop';
    }
    if (isTablet()) {
        return 'tablet';
    }
    if (isSmallTablet()) {
        return 'small-tablet';
    }
    return 'mobile';
}

export const BIG_DESKTOP_SIZE = 1440;
export const DESKTOP_SIZE = 1025;
export const TABLET_SIZE = 1024;
export const SMALL_TABLET_SIZE = 768;
export const MOBILE_SIZE = 576;

export function isBigDesktop (): boolean {
    return window.innerWidth >= BIG_DESKTOP_SIZE;
}

export function isDesktop (): boolean {
    return window.innerWidth >= DESKTOP_SIZE;
}

export function isTablet (): boolean {
    return window.innerWidth >= TABLET_SIZE && window.innerWidth <= DESKTOP_SIZE;
}

export function isSmallTablet (): boolean {
    return window.innerWidth >= SMALL_TABLET_SIZE && window.innerWidth <= TABLET_SIZE;
}

export function isMobile (): boolean {
    return window.innerWidth <= SMALL_TABLET_SIZE;
}

type WindowSizes = 'mobile' | 'small-tablet' | 'tablet' | 'desktop' | 'big-desktop';

export async function writeToClipboard (text: string): Promise<boolean> {
    if (!isClipboardSupported()) {
        return false;
    }
    try {
        await window.navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.warn('Copy failed', error);
        return false;
    }
}

export async function readFromClipboard (): Promise<string | false> {
    if (!isClipboardSupported()) {
        return false;
    }
    try {
        return await window.navigator.clipboard.readText();
    } catch (error) {
        console.warn('Reading copied text is failed', error);
        return false;
    }
}

export function isClipboardSupported (): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!window.navigator.clipboard) {
        console.warn('clipboard is not supported');
        return false;
    }
    return true;
}
