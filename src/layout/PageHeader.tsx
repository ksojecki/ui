import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Heading } from '../typography/Heading';
import { joinClassNames } from '../internal/classNames';
import { Paragraph } from '../typography/Paragraph';

export interface PageHeaderProps extends Omit<ComponentPropsWithoutRef<'header'>, 'title'> {
  actions?: ReactNode;
  className?: string;
  /** Use a compact, unboxed presentation when the header sits directly on the page. */
  appearance?: 'default' | 'plain';
  description?: ReactNode;
  eyebrow?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
}

export function PageHeader({
  actions,
  className,
  appearance = 'default',
  description,
  eyebrow,
  meta,
  title,
  ...rest
}: PageHeaderProps) {
  return (
    <header
      {...rest}
      className={joinClassNames(
        'flex flex-col',
        appearance === 'plain'
          ? 'gap-3 py-2'
          : 'gap-4 rounded-box border border-base-300 bg-base-100 p-6 shadow-(--elevation-1)',
        className,
      )}
    >
      <div
        className={joinClassNames(
          'flex flex-col lg:flex-row lg:items-start lg:justify-between',
          appearance === 'plain' ? 'gap-3' : 'gap-4',
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {eyebrow !== undefined ? (
            <div className="text-sm font-medium uppercase tracking-[0.16em] text-base-content/50">
              {eyebrow}
            </div>
          ) : null}
          <Heading className="font-semibold" level={1}>
            {title}
          </Heading>
          {description !== undefined ? <Paragraph tone="muted">{description}</Paragraph> : null}
        </div>

        {actions !== undefined ? (
          <div className="flex flex-wrap gap-2 lg:justify-end">{actions}</div>
        ) : null}
      </div>

      {meta !== undefined ? (
        <div className="flex flex-wrap gap-3 text-sm text-base-content/70">{meta}</div>
      ) : null}
    </header>
  );
}
