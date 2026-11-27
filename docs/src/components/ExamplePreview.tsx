import type { ComponentType } from 'react';
import { MemoryRouter } from 'react-router';

const examples = import.meta.glob<{ default: ComponentType }>('../examples/**/*.tsx', {
  eager: true,
});

/** Renders `src/examples/<name>.tsx`. Router components need a router, so every example gets one. */
export default function ExamplePreview({ name }: { name: string }) {
  const Example = examples[`../examples/${name}.tsx`]?.default;
  if (!Example) {
    throw new Error(`Missing example src/examples/${name}.tsx`);
  }
  return (
    <MemoryRouter>
      <Example />
    </MemoryRouter>
  );
}
