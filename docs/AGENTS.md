# Docs agent guide

- This Astro site documents `@ksojecki/ui` and is published at sojecki.pl/ui. Keep it out of the library tarball.
- Run it with `pnpm dev:docs`; build it with `pnpm build:docs` (`DOCS_BASE=/ui/` for the published path).
- A component page is `src/content/components/<id>.mdx` plus examples in `src/examples/<id>/*.tsx`. Frontmatter `components` lists the exports whose props tables the page shows; tables are generated from the TypeScript source and JSDoc, so document props there.
- Examples default-export one React component, import only from public `@ksojecki/ui/<group>` subpaths, and stay short: their source is shown on the page.
- Guides live in `src/content/guides/`, ordered by `order`. New component groups go in `src/lib/groups.ts`.
- Check pages in every palette, light and dark, and on a narrow screen.
