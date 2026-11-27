# @ksojecki/ui

React components and daisyUI themes with semantic `purpose` props: buttons, forms, tables, feedback, navigation, overlays and page layout.

Documentation, with live examples and props for every component: [sojecki.pl/ui](https://sojecki.pl/ui/).

## Install

The package is distributed through GitHub Packages. Add the scope to your project's `.npmrc`:

```ini
@ksojecki:registry=https://npm.pkg.github.com
```

Add the token reference to your user `~/.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Set `NODE_AUTH_TOKEN` to a GitHub personal access token (classic) with `read:packages` and access to the package. In GitHub Actions, you can use `GITHUB_TOKEN` with `packages: read` if the package grants the workflow repository access.

```sh
pnpm add @ksojecki/ui react react-dom react-router daisyui tailwindcss
```

Peer dependencies: `react` and `react-dom` ^19, `react-router` ^8, `daisyui` ^5.6.0, `tailwindcss` ^4. The package is ESM only. `FormField` takes the result of react-hook-form's `register()` but does not depend on that package.

## Set up styles

In your app's main stylesheet, import Tailwind, then one palette entry:

```css
@import 'tailwindcss';
@import '@ksojecki/ui/styles/generic.css';
```

Each entry loads daisyUI with its built-in themes off, the shared rules from `theme.css` (including the Karla font and motion utilities), one palette, and a Tailwind `@source` for the built components, so their classes are generated.

Palettes: `generic`, `budget`, `traffic`, `roadsign`. Each defines a light theme `<name>` and a dark theme `<name>-dark`. With no `data-theme` on `<html>`, the OS colour scheme decides. Set `data-theme="<name>"` or `"<name>-dark"` to force one. Use exactly one entry.

To compose the pieces yourself, import `@ksojecki/ui/theme.css` and one `@ksojecki/ui/themes/<name>.css` after `@plugin 'daisyui' { themes: false; }`, and add `@source '../node_modules/@ksojecki/ui/dist';`.

## Use

Import from a group subpath, never from the package root.

```tsx
import { Button } from '@ksojecki/ui/actions';
import { Alert } from '@ksojecki/ui/feedback';

export function Example() {
  return (
    <>
      <Alert purpose="success">Saved.</Alert>
      <Button purpose="save" type="submit">
        Save
      </Button>
    </>
  );
}
```

Choose a `purpose` (`ActionPurpose`, `StatusPurpose`, `BadgePurpose`), not a colour. `tone` and `variant` are escape hatches. Keep colours in theme tokens; do not use hex values or palette classes.

`Link`, `NavMenu`, `Menu` and the consent components render `react-router` links, so mount them inside a router.

## Icons

`@ksojecki/ui/icons` re-exports the whole [Tabler icon set](https://react-icons.github.io/react-icons/icons/tb/) from `react-icons/tb` (`TbPlus`, `TbTrash`, `TbBrandGoogle`, and the rest) plus the `IconType` type. `react-icons` is external and the package marks its JavaScript as side-effect free, so a bundler keeps only the icons you import. Import by name; do not use `import * as icons`, which pulls in all of them.

## Components

- `actions`: `Button`, `ButtonGroup`, `IconButton`, `EditButton`/`NewButton`/`DeleteButton`
- `forms`: `Field`, `FormField`, `FormActions`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`/`RadioGroup`, `Switch`, `Range`, `FileInput`, `DatePicker`, `TimePicker`, `SegmentedControl`, `FilterBar`, `FilterRow`
- `feedback`: `Alert`, `Badge`, `Toast`, `Progress`, `Spinner`, `Skeleton`, `Tooltip`, `ConfirmDeletePanel`, `EmptyState`
- `typography`: `Heading`, `Paragraph`, `Prose`
- `layout`: `Page`, `PageContainer`, `PageHeader`, `Section`, `Card`, `Divider`, `Disclosure`, `BottomSheet`
- `navigation`: `Link`, `Menu`, `Dropdown`, `NavMenu`
- `overlays`: `ModalWindow`, `NativeDialog`, `ConsentBanner`, `ConsentSettings`
- `data`: `DataTable`, `Table`, `Metric`/`MetricGroup`
- `icons`: the Tabler icon set

Motion utilities (`animate-fade-in`, `animate-slide-up`, `animate-scale-in`) come from `theme.css` and switch off under `prefers-reduced-motion`.

## License

MIT

## Working in this repository

Use Node 26 and pnpm 12. The repository pins their versions in `.node-version` and `package.json`.

Run `pnpm install --frozen-lockfile && pnpm dev:docs`, then open [localhost:4400](http://localhost:4400). The docs site in `docs/` is built with Astro, loads components from source and previews all four palettes in light and dark. It is not included in the package tarball. `pnpm build:docs` builds it; set `DOCS_BASE=/ui/` to serve it under a path.

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm pack
```

Vite builds the ESM entry points, and TypeScript emits the declarations alongside them in `dist/`. Specs run in Vitest with jsdom. See [AGENTS.md](./AGENTS.md) for contribution conventions.

## Releases

Update the version in `package.json` through a PR. After it merges, tag the versioned commit on `main` as `v<version>` and push that tag. The release workflow rejects a mismatched tag or a commit outside `main`, builds the library, and publishes to GitHub Packages. Pushing to `main` alone does not publish.

Grant consuming repositories Actions read access in the `@ksojecki/ui` package settings before switching their dependencies.
