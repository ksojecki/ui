import { fileURLToPath } from 'node:url';

/** Library subpaths, in the order the showcase and the API reference list them. */
export const GROUPS = [
  'actions',
  'forms',
  'feedback',
  'data',
  'layout',
  'navigation',
  'overlays',
  'typography',
];

export const LIBRARY_ROOT = fileURLToPath(new URL('..', import.meta.url));
