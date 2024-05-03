import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { isLocal, open } from './url.utils';

describe('isLocal', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      location: {
        host: 'ankas.local',
      },
    });
  });

  test('local', () => {
    expect(isLocal()).toBeTruthy();
  });

  test('test', () => {
    window.location.host = 'ankas.test';
    expect(isLocal()).toBeTruthy();
  });

  test('noLocal', () => {
    window.location.host = 'ankas.ru';
    expect(isLocal()).toBeFalsy();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
});

describe('open', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      open: vi.fn(),
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
