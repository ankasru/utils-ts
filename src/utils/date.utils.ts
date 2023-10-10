import { isEmpty, type Nullable } from './helpers.utils';

export function convert (timestamp: Nullable<string>, options?: { time?: boolean; locales?: Intl.LocalesArgument }): Nullable<string> {
    if (isEmpty(timestamp)) {
        return timestamp;
    }
    const date = new Date(<string> timestamp);

    if (!isDateValid(date)) {
        return '';
    }

    return options?.time ?? false ? date.toLocaleString(options?.locales) : date.toLocaleDateString(options?.locales);
}

export function isDateValid (date: Date): boolean {
    return !Number.isNaN(date.getTime());
}

export function getThisDate (): { day: number; numberInWeek: number; month: number; year: number } {
    const now = new Date();

    return {
        day: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear(),
        numberInWeek: now.getDay()
    };
}

export function plusTime (timestamp: string, { hours }: { hours?: number }): Date {
    const date = new Date(timestamp);
    if (!isEmpty(hours)) {
        date.setHours(date.getHours() + <number> hours);
    }
    return date;
}
