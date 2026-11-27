import type { ReactNode } from 'react';
import { Heading } from '../typography/Heading';
import { joinClassNames } from '../internal/classNames';

export interface EmptyStateProps {
  children?: ReactNode;
  /** Short heading above the message. */
  title?: ReactNode;
  /** Optional call to action rendered below the message. */
  action?: ReactNode;
  /** `sm` for small inline lists and charts. */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Placeholder for a list or panel with nothing to show.
 *
 * @example
 * ```tsx
 * <EmptyState action={<NewButton label="New invoice" />} title="No invoices yet">
 *   Create the first one to get started.
 * </EmptyState>
 * ```
 */
export const EmptyState = ({
  action,
  children,
  className,
  size = 'md',
  title,
}: EmptyStateProps) => (
  <div
    className={joinClassNames(
      'rounded-box border border-dashed border-base-300 text-center text-base-content/60',
      size === 'sm' ? 'p-4 text-sm' : 'p-8',
      className,
    )}
  >
    {title ? (
      <Heading className="mb-1 font-semibold text-base-content" level={3} size={4}>
        {title}
      </Heading>
    ) : null}
    {children}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);
