import type { ComponentPropsWithoutRef } from 'react';
import { joinClassNames } from '../internal/classNames';

/** Placeholder block for loading content. Size it with Tailwind classes. */
export const Skeleton = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => (
  <div {...rest} aria-hidden="true" className={joinClassNames('skeleton', className)} />
);
