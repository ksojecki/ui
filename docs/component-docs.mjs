import { resolve } from 'node:path';
import { withCustomConfig } from 'react-docgen-typescript';
import ts from 'typescript';
import { GROUPS, LIBRARY_ROOT } from './groups.mjs';

const TSCONFIG = resolve(LIBRARY_ROOT, 'tsconfig.lib.json');
const entryPoint = (group) => resolve(LIBRARY_ROOT, 'src', group, 'index.ts');

const isOwnDeclaration = (declaration) => !declaration.fileName.includes('node_modules');

const parser = withCustomConfig(TSCONFIG, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  skipChildrenPropWithoutDoc: false,
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

function componentFunction(declaration) {
  if (declaration && ts.isFunctionDeclaration(declaration)) {
    return declaration;
  }
  let initializer =
    declaration && ts.isVariableDeclaration(declaration) ? declaration.initializer : undefined;
  while (initializer && ts.isCallExpression(initializer)) {
    initializer = initializer.arguments[0];
  }
  return initializer && (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer))
    ? initializer
    : undefined;
}

function destructuringDefaults(fn) {
  const binding = fn?.parameters[0]?.name;
  if (!binding || !ts.isObjectBindingPattern(binding)) {
    return {};
  }
  return Object.fromEntries(
    binding.elements
      .filter((element) => element.initializer && !element.dotDotDotToken)
      .map((element) => [
        (element.propertyName ?? element.name).getText(),
        element.initializer.getText().replace(/^(['"])(.*)\1$/, '$2'),
      ]),
  );
}

// react-docgen-typescript merges the destructuring defaults of every component in a file, so a
// component would show its neighbour's defaults. Read them from each export's own parameter.
function ownDefaults() {
  const config = ts.getParsedCommandLineOfConfigFile(
    TSCONFIG,
    {},
    { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {} },
  );
  const program = ts.createProgram(GROUPS.map(entryPoint), config.options);
  const checker = program.getTypeChecker();
  return new Map(
    GROUPS.flatMap((group) => {
      const module = checker.getSymbolAtLocation(program.getSourceFile(entryPoint(group)));
      return checker.getExportsOfModule(module).map((exported) => {
        const symbol =
          exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
        const fn = componentFunction(symbol.valueDeclaration ?? symbol.declarations?.[0]);
        return [`${group}/${exported.name}`, destructuringDefaults(fn)];
      });
    }),
  );
}

function toProp(prop, defaults) {
  return {
    name: prop.name,
    type: typeLabel(prop.type),
    options: prop.type.name === 'enum' ? prop.type.value.map((option) => option.value) : [],
    required: prop.required,
    defaultValue: defaults[prop.name] ?? null,
    description: prop.description,
  };
}

function toComponent(group, doc, defaults) {
  return {
    name: doc.displayName,
    group,
    description: doc.description,
    example: doc.tags?.example?.replace(/^```\w*\n|\n```$/g, '') ?? null,
    props: Object.values(doc.props)
      .map((prop) => toProp(prop, defaults))
      .sort((a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name)),
  };
}

/** Exported React components of every subpath (PascalCase exports), with their own props. */
export function readComponentDocs() {
  const defaults = ownDefaults();
  return GROUPS.flatMap((group) =>
    parser
      .parse(entryPoint(group))
      .filter((doc) => /^[A-Z]/.test(doc.displayName))
      .map((doc) => toComponent(group, doc, defaults.get(`${group}/${doc.displayName}`) ?? {})),
  );
}
