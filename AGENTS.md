# Platform UI agent guide

- Keep `src/` free of app-specific behavior. Export components through their group’s `index.ts` and keep implementation details in `src/internal/`.
- Keep component names free of the `Ui` prefix. Keep props simple, prefer composition, and reuse existing patterns.
- Use semantic `purpose` props and theme tokens instead of fixed colors. Check palette changes in both light and dark modes.
- Do not add lint suppression comments or directories or files named `utils`, `common`, `helpers`, or `misc`.
- Add tests alongside changed components and check keyboard and screen reader behavior.
- Before handoff run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm pack`. For export or CSS changes, install the archive in a clean consumer rather than relying on source imports.
