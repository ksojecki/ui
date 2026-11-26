import type { ReactNode } from 'react';
import { Heading } from '@ksojecki/platform-ui/typography';

/** A labelled group of examples inside a showcase section. */
export function Specimen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Heading level={3} size="label">
        {title}
      </Heading>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
