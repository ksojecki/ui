import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const librarySource = fileURLToPath(new URL('../src', import.meta.url));

export default defineConfig({
  base: process.env.DOCS_BASE ?? '/',
  trailingSlash: 'always',
  integrations: [react(), mdx()],
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  server: { port: 4400, host: 'localhost' },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Examples import the library by its public subpaths; serve them from source.
      alias: [
        {
          find: /^@ksojecki\/ui\/(actions|data|feedback|forms|icons|layout|navigation|overlays|typography)$/,
          replacement: `${librarySource}/$1/index.ts`,
        },
      ],
    },
  },
});
