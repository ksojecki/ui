import { globSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { builtinResolvers, makeFsImporter, parse, type Documentation } from 'react-docgen';

export interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  required: boolean;
  description: string;
}

export interface ComponentDoc {
  name: string;
  /** Path of the source file relative to the repository root, e.g. `src/actions/Button.tsx`. */
  file: string;
  description: string;
  props: PropRow[];
  /** Names of the types the props extend, e.g. `ButtonHTMLAttributes`. */
  extendsTypes: string[];
}

const repositoryRoot = resolve(process.cwd(), '..');
let cache: Map<string, ComponentDoc> | undefined;

function typeOf(prop: NonNullable<Documentation['props']>[string]) {
  const type = prop.tsType;
  if (!type) {
    return 'unknown';
  }
  const raw = 'raw' in type && type.raw ? type.raw : type.name;
  return raw.replace(/\s+/g, ' ').replace(/^\| /, '').trim();
}

function toDoc(doc: Documentation, file: string): ComponentDoc | undefined {
  if (!doc.displayName) {
    return undefined;
  }
  return {
    name: doc.displayName,
    file,
    description: doc.description ?? '',
    props: Object.entries(doc.props ?? {}).map(([name, prop]) => ({
      name,
      type: typeOf(prop),
      defaultValue: prop.defaultValue ? String(prop.defaultValue.value) : undefined,
      required: Boolean(prop.required),
      description: prop.description ?? '',
    })),
    extendsTypes: doc.composes ?? [],
  };
}

/** Props of every exported component in the library, read from its TypeScript source. */
export function componentDocs() {
  if (cache) {
    return cache;
  }
  cache = new Map();
  const files = globSync('src/*/**/*.tsx', { cwd: repositoryRoot }).filter(
    (file) => !file.includes('.spec.') && !file.includes('/internal/'),
  );
  for (const file of files.toSorted()) {
    const path = resolve(repositoryRoot, file);
    const parsed = parse(readFileSync(path, 'utf8'), {
      filename: path,
      importer: makeFsImporter(),
      resolver: new builtinResolvers.FindExportedDefinitionsResolver(),
    });
    for (const doc of parsed) {
      const entry = toDoc(doc, relative(repositoryRoot, path));
      if (entry) {
        cache.set(entry.name, entry);
      }
    }
  }
  return cache;
}

export function componentDoc(name: string) {
  const doc = componentDocs().get(name);
  if (!doc) {
    throw new Error(
      `No exported component named ${name} in src/. Check the page's components list.`,
    );
  }
  return doc;
}
