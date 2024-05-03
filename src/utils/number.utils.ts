import { toNumber } from './helpers.utils';

export function formatFactory(
  settings: Intl.NumberFormatOptions & { lang?: string }
): (number: number | string) => string {
  return (number) => {
    const { lang, ...intlSettings } = settings;
    return new Intl.NumberFormat(lang ?? 'en-US', intlSettings).format(
      toNumber(number)
    );
  };
}
