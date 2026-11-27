import { resolve } from 'node:path';
import { writeApiReference } from './api-reference.mjs';
import { readComponentDocs } from './component-docs.mjs';

const MODULE_ID = 'virtual:ui-component-docs';
const RESOLVED_ID = `\0${MODULE_ID}`;

/**
 * Serves the props, descriptions and examples of every component as `virtual:ui-component-docs`,
 * and on build writes the TypeDoc API reference to `<outDir>/docs`.
 */
export function componentDocs() {
  let outDir = 'dist';
  let isBuild = false;
  return {
    name: 'ui-component-docs',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
      isBuild = config.command === 'build';
    },
    resolveId: (id) => (id === MODULE_ID ? RESOLVED_ID : undefined),
    load: (id) =>
      id === RESOLVED_ID ? `export default ${JSON.stringify(readComponentDocs())};` : undefined,
    async closeBundle() {
      if (isBuild) {
        await writeApiReference(resolve(outDir, 'docs'));
      }
    },
  };
}
