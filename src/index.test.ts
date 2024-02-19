import { describe, expect, test } from 'vitest';
import * as utils from './index';
import { readdirSync } from 'fs';
import path from 'path';

describe('imports', () => {
    test('exports defined', () => {
        const utilsDir = path.resolve(__dirname, 'utils');
        const utilsFiles = readdirSync(utilsDir);

        for (const fileName of utilsFiles) {
            if (fileName.includes('test')) {
                continue;
            }
            const importName = fileName.replace('.utils.ts', '');
            expect(importName in utils).toBeTruthy();
        }
    });
});
