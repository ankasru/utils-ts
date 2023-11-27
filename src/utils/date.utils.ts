import { isEmpty, type Nullable } from './helpers.utils';

type DateInput = string | number | Date;

export function convert (timestamp: Nullable<string>, options?: { time?: boolean; locales?: Intl.LocalesArgument }): Nullable<string> {
    if (isEmpty(timestamp)) {
        return timestamp;
    }
    const date = new Date(timestamp);

    if (!isValid(date)) {
        return '';
    }

    return options?.time ?? false ? date.toLocaleString(options?.locales) : date.toLocaleDateString(options?.locales);
}

export function isValid (date: Date): boolean {
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

export function getDiff (date: DateInput, date2: DateInput): number {
    const dateFirst = new Date(date).getTime();
    const dateSecond = new Date(date2).getTime();

    return Math.abs(dateFirst - dateSecond);
}

export function plusTime (timestamp: DateInput, { minutes, hours, days, weeks }: { minutes?: number; hours?: number; days?: number; weeks?: number }): Date {
    const date = new Date(timestamp);
    let plusValue = 0;

    if (!isEmpty(minutes)) {
        plusValue += minutesToMilliseconds(minutes);
    }
    if (!isEmpty(hours)) {
        plusValue += hoursToMilliseconds(hours);
    }
    if (!isEmpty(days)) {
        plusValue += daysToMilliseconds(days);
    }
    if (!isEmpty(weeks)) {
        plusValue += weeksToMilliseconds(weeks);
    }

    date.setTime(date.getTime() + plusValue);

    return date;
}

export function weeksToMilliseconds (weeks: number): number {
    return daysToMilliseconds(weeks * 7);
}

export function daysToMilliseconds (days: number): number {
    return hoursToMilliseconds(days * 24);
}

export function hoursToMilliseconds (hours: number): number {
    return minutesToMilliseconds(hours * 60);
}

export function minutesToMilliseconds (minutes: number): number {
    return secondsToMilliseconds(minutes * 60);
}

export function secondsToMilliseconds (seconds: number): number {
    return seconds * 1000;
}
