# UI showcase

Preview the `@ksojecki/ui` components in all four palettes: budget, traffic, roadsign, and generic. Each palette has a light and dark scheme.

## Run

```sh
pnpm dev:ui-showcase   # http://localhost:4400
pnpm --filter @ksojecki/ui-showcase typecheck
pnpm --filter @ksojecki/ui-showcase build
```

The toolbar sets `data-theme` on `<html>` to `<palette>` or `<palette>-dark` and remembers the choice in `localStorage`.

Vite serves components from the library source, so no separate library build is needed. The production build writes the gallery to `showcase/dist/`; it is not part of the library tarball.

The first section, Guide, renders the consumer part of the root `README.md` (everything before `## License`), so the published docs follow the README.

Below each group's specimens, "Components and props" lists every exported component with its description, an `@example` snippet and a props table. The `@ksojecki/ui-docs` Vite plugin (`docs/`) reads them from the TypeScript source and JSDoc with `react-docgen-typescript` and serves them as `virtual:ui-component-docs`. To document a component, add a JSDoc summary, an `@example` block and prop comments in `src/`.

The production build also writes a TypeDoc API reference of every subpath to `showcase/dist/docs/`, published at [sojecki.pl/ui/docs](https://sojecki.pl/ui/docs/). It is not served by the dev server.

## Deploy

The gallery is published at [sojecki.pl/ui](https://sojecki.pl/ui/). The sojecki.pl site build clones this repository and runs `SHOWCASE_BASE=/ui/ pnpm --filter @ksojecki/ui-showcase build`; `SHOWCASE_BASE` sets the Vite `base` (default `/`). After CI passes on `main`, the `deploy-preview` job calls the sojecki.pl Render deploy hook from the `SOJECKI_PL_DEPLOY_HOOK` secret, and skips when the secret is missing.
