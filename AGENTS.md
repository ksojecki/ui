# Platform UI agent guide

- Keep `src/` free of app-specific behavior. Export components through their group’s `index.ts` and keep implementation details in `src/internal/`.
- Keep component names free of the `Ui` prefix. Keep props simple, prefer composition, and reuse existing patterns.
- Use semantic `purpose` props and theme tokens instead of fixed colors. Check palette changes in both light and dark modes.
- Do not add lint suppression comments or directories or files named `utils`, `common`, `helpers`, or `misc`.
- Add tests alongside changed components and check keyboard and screen reader behavior.
- Before handoff run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm pack`. For export or CSS changes, install the archive in a clean consumer rather than relying on source imports.
- When you add or change a component, update its page in `docs/` (see `docs/AGENTS.md`). `tests/docs-coverage.spec.ts` fails when an exported component has no page.
- Plan component and API changes with OpenSpec: `/openspec-propose` (Codex: `$openspec-propose`), then `/openspec-apply-change` and `/openspec-archive-change`, archiving in the same pull request as the code. Specs live in `openspec/`. A change that also needs work in `web-projects`, `web-platform` or `transport_map` goes in the `ksojecki` store ([ksojecki/openspec](https://github.com/ksojecki/openspec)) with `--store ksojecki`. Install the CLI with `npm install -g @fission-ai/openspec@2.2.0` and register the store once per machine as its [README](https://github.com/ksojecki/openspec#setup) describes; do not edit the generated `.agents/skills/openspec*` skills, run `openspec update` instead.
