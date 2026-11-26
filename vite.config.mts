/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  root: import.meta.dirname,
  plugins: [react()],
  // Configuration for building your library.
  // See: https://vite.dev/guide/build.html#library-mode
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: Object.fromEntries(
        [
          'actions',
          'data',
          'feedback',
          'forms',
          'icons',
          'layout',
          'navigation',
          'overlays',
          'typography',
        ].map((folder) => [`${folder}/index`, `src/${folder}/index.ts`]),
      ),
      fileName: (_format: string, name: string) => `${name}.js`,
      formats: ['es' as const],
    },
    rolldownOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'cally',
        /^react-icons(\/|$)/,
        /^react-router(\/|$)/,
      ],
    },
  },
  test: {
    name: '@ksojecki/ui',
    watch: false,
    fsModuleCachePath: 'node_modules/.vitest-cache',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    reporters: [
      'default',
      ...(process.env.CI ? ['github-actions'] : []),
      ['junit', { outputFile: './test-output/vitest/junit.xml' }],
    ],
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
}));
