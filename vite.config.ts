import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const appDir = path.resolve(__dirname);
const srcDir = path.resolve(appDir, 'src');

const indexFile = path.resolve(srcDir, 'index.ts');

export default defineConfig({
    plugins: [
        dts()
    ],
    envDir: appDir,
    resolve: {
        alias: {
            '*': srcDir
        }
    },
    build: {
        lib: {
            entry: [indexFile],
            name: 'utils-ts',
            fileName: 'index'
        },
        rollupOptions: {
            output: {
                strict: true
            }
        }
    }
});
