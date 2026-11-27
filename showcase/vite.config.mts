import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { componentDocs } from '@ksojecki/ui-docs/vite';

export default defineConfig({
  base: process.env.SHOWCASE_BASE ?? '/',
  plugins: [react(), tailwindcss(), componentDocs()],
  resolve: { tsconfigPaths: true },
  server: { port: 4400, host: 'localhost' },
});
