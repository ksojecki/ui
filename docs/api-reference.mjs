import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Application } from 'typedoc';
import { GROUPS, LIBRARY_ROOT } from './groups.mjs';

/** Writes the TypeDoc HTML reference of every `@ksojecki/ui/<group>` subpath to `out`. */
export async function writeApiReference(out) {
  const app = await Application.bootstrap({
    name: '@ksojecki/ui API reference',
    entryPoints: GROUPS.map((group) => resolve(LIBRARY_ROOT, 'src', group, 'index.ts')),
    tsconfig: resolve(LIBRARY_ROOT, 'tsconfig.lib.json'),
    readme: fileURLToPath(new URL('./api-reference.md', import.meta.url)),
    excludeExternals: true,
    externalPattern: ['**/node_modules/**'],
    sort: ['kind', 'alphabetical'],
    hideGenerator: true,
    logLevel: 'Warn',
  });
  const project = await app.convert();
  if (!project) {
    throw new Error('TypeDoc could not convert the @ksojecki/ui sources.');
  }
  await app.generateDocs(project, out);
}
