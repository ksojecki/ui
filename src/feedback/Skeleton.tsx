import type { ComponentPropsWithoutRef } from 'react';
import { joinClassNames } from '../internal/classNames';

/**
 * Placeholder block for loading content. Size it with Tailwind classes.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-48" />
 * ```
 */
export const Skeleton = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => (
  <div {...rest} aria-hidden="true" className={joinClassNames('skeleton', className)} />
);
