import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import * as actions from '../src/actions';
import * as data from '../src/data';
import * as feedback from '../src/feedback';
import * as forms from '../src/forms';
import * as layout from '../src/layout';
import * as navigation from '../src/navigation';
import * as overlays from '../src/overlays';
import * as typography from '../src/typography';

const GROUPS = { actions, data, feedback, forms, layout, navigation, overlays, typography };
const PAGES = resolve(import.meta.dirname, '../docs/src/content/components');

/** Group and component names listed in the frontmatter of every docs page. */
function documented() {
  return readdirSync(PAGES)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = readFileSync(resolve(PAGES, file), 'utf8');
      const group = /^group: (\w+)$/m.exec(source)?.[1];
      const list = /^components: \[(.*)\]$/m.exec(source)?.[1] ?? '';
      return { file, group, components: list.split(',').map((name) => name.trim()) };
    });
}

const isComponentName = (name: string) => /^[A-Z][a-z]/.test(name);

describe('docs', () => {
  const pages = documented();

  it.each(Object.entries(GROUPS))(
    'documents every component exported from %s',
    (group, exports) => {
      const names = new Set(
        pages.filter((page) => page.group === group).flatMap((page) => page.components),
      );
      const components = Object.entries(exports)
        .filter(([name, value]) => isComponentName(name) && typeof value === 'function')
        .map(([name]) => name);

      expect(components.filter((name) => !names.has(name))).toEqual([]);
    },
  );

  it('lists only components the page group exports', () => {
    const unknown = pages.flatMap((page) =>
      page.components
        .filter((name) => !(name in (GROUPS[page.group as keyof typeof GROUPS] ?? {})))
        .map((name) => `${page.file}: ${name}`),
    );

    expect(unknown).toEqual([]);
  });
});
