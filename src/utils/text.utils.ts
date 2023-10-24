import { isEmpty, type Nullable } from './helpers.utils';

export function HTMLSwitcher (value: Nullable<string>, { action = 'unescape' }: { action: 'escape' | 'unescape' | 'remove' }): Nullable<string> {
    const HTMLEscapeValues = [
        {
            symbol: '&',
            escapedSymbol: 'amp'
        },
        {
            symbol: '<',
            escapedSymbol: 'lt'
        },
        {
            symbol: '>',
            escapedSymbol: 'gt'
        },
        {
            symbol: '\'',
            escapedSymbol: '#39'
        },
        {
            symbol: '"',
            escapedSymbol: 'quot'
        }
    ];

    if (!isEmpty(value)) {
        if (action === 'remove') {
            HTMLEscapeValues.forEach(escapeValue => {
                const unescapeReg = new RegExp(`&${escapeValue.escapedSymbol};`, 'g');
                value = value?.replace(unescapeReg, escapeValue.symbol);
            });
            HTMLEscapeValues.forEach(escapeValue => {
                const escapeReg = new RegExp(escapeValue.symbol, 'g');
                value = value?.replace(escapeReg, '');
            });
        } else {
            HTMLEscapeValues.forEach(escapeValue => {
                const escapeReg = new RegExp(escapeValue.symbol, 'g');
                const unescapeReg = new RegExp(`&${escapeValue.escapedSymbol};`, 'g');
                switch (action) {
                    case 'escape':
                        value = value?.replace(escapeReg, `&${escapeValue.escapedSymbol};`);
                        break;
                    default:
                        value = value?.replace(unescapeReg, escapeValue.symbol);
                        break;
                }
            });
        }
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
