import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export type PageContainerWidth = 'standard' | 'wide' | 'full';

export interface PageContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
  width?: PageContainerWidth;
}

const WIDTH_CLASS: Record<PageContainerWidth, string> = {
  standard: 'max-w-5xl',
  wide: 'max-w-6xl',
  full: '',
};

/**
 * Centres page content and caps its width: `standard` (default), `wide` or `full`.
 *
 * @example
 * ```tsx
 * <PageContainer width="wide">
 *   <PageHeader title="Reports" />
 * </PageContainer>
 * ```
 */
export function PageContainer({
  children,
  className,
  width = 'standard',
  ...rest
}: PageContainerProps) {
  return (
    <div {...rest} className={joinClassNames('mx-auto w-full', WIDTH_CLASS[width], className)}>
      {children}
    </div>
  );
}
