# @ksojecki/platform-ui

React components and daisyUI themes with semantic `purpose` props: buttons, forms, tables, feedback, navigation, overlays and page layout.

## Install

The package is not published yet. To try it, build and pack this repository, then install the archive in your app:

```sh
pnpm add /path/to/ksojecki-platform-ui-0.0.1.tgz react react-dom react-router daisyui tailwindcss
```

Peer dependencies: `react` and `react-dom` ^19, `react-router` ^8, `daisyui` ^5, `tailwindcss` ^4. The package is ESM only. `FormField` takes the result of react-hook-form's `register()` but does not depend on that package.

## Set up styles

In your app's main stylesheet, import Tailwind, then one palette entry:

```css
@import 'tailwindcss';
@import '@ksojecki/platform-ui/styles/generic.css';
```

Each entry loads daisyUI with its built-in themes off, the shared rules from `theme.css` (including the Karla font and motion utilities), one palette, and a Tailwind `@source` for the built components, so their classes are generated.

Palettes: `generic`, `budget`, `traffic`, `roadsign`. Each defines a light theme `<name>` and a dark theme `<name>-dark`. With no `data-theme` on `<html>`, the OS colour scheme decides. Set `data-theme="<name>"` or `"<name>-dark"` to force one. Use exactly one entry.

To compose the pieces yourself, import `@ksojecki/platform-ui/theme.css` and one `@ksojecki/platform-ui/themes/<name>.css` after `@plugin 'daisyui' { themes: false; }`, and add `@source '../node_modules/@ksojecki/platform-ui/dist';`.

## Use

Import from a group subpath, never from the package root.

```tsx
import { Button } from '@ksojecki/platform-ui/actions';
import { Alert } from '@ksojecki/platform-ui/feedback';

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

`@ksojecki/platform-ui/icons` re-exports the whole [Tabler icon set](https://react-icons.github.io/react-icons/icons/tb/) from `react-icons/tb` (`TbPlus`, `TbTrash`, `TbBrandGoogle`, and the rest) plus the `IconType` type. `react-icons` is external and the package marks its JavaScript as side-effect free, so a bundler keeps only the icons you import. Import by name; do not use `import * as icons`, which pulls in all of them.

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
