const sources = import.meta.glob<string>('../examples/**/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Source code of `src/examples/<name>.tsx`, as shown under the live preview. */
export function exampleSource(name: string) {
  const source = sources[`../examples/${name}.tsx`];
  if (source === undefined) {
    throw new Error(`Missing example src/examples/${name}.tsx`);
  }
  return source.trim();
}
