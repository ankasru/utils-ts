import { isEmpty, type Nullable } from './helpers.utils';

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

export function plusTime (timestamp: string, { minutes, hours, days }: { minutes?: number; hours?: number; days?: number }): Date {
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

    date.setTime(date.getTime() + plusValue);

    return date;
}

function daysToMilliseconds (days: number): number {
    return hoursToMilliseconds(days * 24);
}

function hoursToMilliseconds (hours: number): number {
    return minutesToMilliseconds(hours * 60);
}

function minutesToMilliseconds (minutes: number): number {
    return secondsToMilliseconds(minutes * 60);
}

function secondsToMilliseconds (seconds: number): number {
    return seconds * 1000;
}
