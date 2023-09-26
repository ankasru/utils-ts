import { isEmpty, type Nullable } from './helpers.utils';

export function convert (timestamp: Nullable<string>, { time = false }: { time: boolean }): Nullable<string> {
    if (isEmpty(timestamp)) {
        return timestamp;
    }
    const date = new Date(<string> timestamp);

    return time ? date.toLocaleString() : date.toLocaleDateString();
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