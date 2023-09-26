import { isEmpty, type Nullable } from './helpers.utils';

export function HTMLSwitcher ({ value, action = 'escape' }: { value: Nullable<string>; action: 'escape' | 'unescape' }): Nullable<string> {
    const HTMLEscapeValues = [
        {
            symbol: '&',
            escapedSymbol: 'amp',
        },
        {
            symbol: '<',
            escapedSymbol: 'lt',
        },
        {
            symbol: '>',
            escapedSymbol: 'gt',
        },
        {
            symbol: '\'',
            escapedSymbol: '#39',
        },
        {
            symbol: '"',
            escapedSymbol: 'quot',
        },
    ];

    if (!isEmpty(value)) {
        HTMLEscapeValues.forEach(escapeValue => {
            if (action === 'escape') {
                const regExp = new RegExp(escapeValue.symbol, 'g');
                value = value?.replace(regExp, `&${escapeValue.escapedSymbol};`);
            } else {
                const regExp = new RegExp(`&${escapeValue.escapedSymbol};`, 'g');
                value = value?.replace(regExp, escapeValue.symbol);
            }
        });
    }
    return value;
}

export function generateHash (length: number = 6): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const hash: string[] = [];
    for (let i = 0; i < length; i++) {
        hash.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }

    return hash.join('');
}