import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: false,
      environment: 'happy-dom',
      include: ['src/**/*.{test,spec}.{ts,tsx,mts,cts}'],
      coverage: {
        reporter: 'text',
      },
    },
  })
);
