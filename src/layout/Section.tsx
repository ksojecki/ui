import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Heading } from '../typography/Heading';
import { joinClassNames } from '../internal/classNames';
import { Paragraph } from '../typography/Paragraph';

export interface SectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  actions?: ReactNode;
  /** Use a compact, unboxed presentation when the section is part of the page flow. */
  appearance?: 'default' | 'plain';
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  description?: ReactNode;
  title: ReactNode;
}

/**
 * Titled block of a page with an optional description and actions. Framed by default; `appearance="plain"` drops the frame.
 *
 * @example
 * ```tsx
 * <Section actions={<EditButton label="Edit address" />} title="Address">
 *   <Paragraph>ul. Długa 1, Gdańsk</Paragraph>
 * </Section>
 * ```
 */
export function Section({
  actions,
  appearance = 'default',
  children,
  className,
  contentClassName,
  description,
  title,
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      className={joinClassNames(
        appearance === 'plain'
          ? 'py-2'
          : 'rounded-box border border-base-300 bg-base-100 p-6 shadow-(--elevation-1)',
        className,
      )}
    >
      <div
        className={joinClassNames(
          'flex flex-col sm:flex-row sm:items-start sm:justify-between',
          appearance === 'plain' ? 'gap-2' : 'gap-3',
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Heading className="font-semibold" level={2}>
            {title}
          </Heading>
          {description !== undefined ? <Paragraph tone="muted">{description}</Paragraph> : null}
        </div>
        {actions !== undefined ? (
          <div className="flex flex-wrap gap-2 sm:justify-end">{actions}</div>
        ) : null}
      </div>

      <div className={joinClassNames(appearance === 'plain' ? 'mt-3' : 'mt-5', contentClassName)}>
        {children}
      </div>
    </section>
  );
}
