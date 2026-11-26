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
