import { resolve } from 'node:path';
import { withCustomConfig } from 'react-docgen-typescript';
import { GROUPS, LIBRARY_ROOT } from './groups.mjs';

const isOwnDeclaration = (declaration) => !declaration.fileName.includes('node_modules');

const parser = withCustomConfig(resolve(LIBRARY_ROOT, 'tsconfig.lib.json'), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => (prop.declarations ?? []).some(isOwnDeclaration),
});

function typeLabel(type) {
  if (type.name === 'enum' && Array.isArray(type.value)) {
    return type.raw && !type.raw.includes('|')
      ? type.raw
      : type.value.map((option) => option.value).join(' | ');
  }
  return type.raw ?? type.name;
}

function toProp(prop) {
  return {
    name: prop.name,
    type: typeLabel(prop.type),
    options: prop.type.name === 'enum' ? prop.type.value.map((option) => option.value) : [],
    required: prop.required,
    defaultValue: prop.defaultValue?.value ?? null,
    description: prop.description,
  };
}

function toComponent(group, doc) {
  return {
    name: doc.displayName,
    group,
    description: doc.description,
    example: doc.tags?.example?.replace(/^```\w*\n|\n```$/g, '') ?? null,
    props: Object.values(doc.props)
      .map(toProp)
      .sort((a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name)),
  };
}

/** Exported React components of every subpath (PascalCase exports), with their own props. */
export function readComponentDocs() {
  return GROUPS.flatMap((group) =>
    parser
      .parse(resolve(LIBRARY_ROOT, 'src', group, 'index.ts'))
      .filter((doc) => /^[A-Z]/.test(doc.displayName))
      .map((doc) => toComponent(group, doc)),
  );
}
