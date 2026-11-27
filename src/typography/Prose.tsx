import type { ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export interface ProseProps {
  children: ReactNode;
  className?: string;
}

/**
 * Long-form reading column: caps the line length at about 65 characters and sets rhythm for the headings, paragraphs and lists inside.
 *
 * @example
 * ```tsx
 * <Prose>
 *   <h2>Terms</h2>
 *   <p>By using the service you agree to these terms.</p>
 * </Prose>
 * ```
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={joinClassNames(
        'flex max-w-prose flex-col gap-4',
        '[&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-balance',
        '[&_h2]:mt-6 [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-balance',
        '[&_h3]:mt-4 [&_h3]:font-semibold',
        '[&_li]:leading-7 [&_p]:leading-7 [&_p]:text-pretty',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
