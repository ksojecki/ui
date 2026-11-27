import type { ReactNode } from 'react';
import { joinClassNames } from '../../internal/classNames';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  children?: ReactNode;
  className?: string;
  level: HeadingLevel;
  /** Visual size when it differs from the level, so the tag can keep the document outline. `label` is a small bold section label. Defaults to `level`. */
  size?: HeadingLevel | 'label';
  id?: string;
  /** Full text shown on hover, for truncated headings. */
  title?: string;
}

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const classes = [
  'text-3xl',
  'text-2xl',
  'text-xl',
  'text-lg',
  'text-base',
  'text-base font-light',
] as const;

const isLevel = (value: number) => Number.isInteger(value) && value >= 1 && value <= 6;

const sizeClass = (size: HeadingLevel | 'label') => {
  if (size === 'label') {
    return 'text-sm font-semibold';
  }
  return isLevel(size) ? classes[size - 1] : 'text-3xl';
};

/**
 * Heading whose tag (`level`) and visual size (`size`) are set separately, so the document outline stays correct.
 *
 * @example
 * ```tsx
 * <Heading level={2}>Invoices</Heading>
 * <Heading level={3} size="label">
 *   Totals
 * </Heading>
 * ```
 */
export const Heading = ({ children, className, id, level, size = level, title }: HeadingProps) => {
  const index = isLevel(level) ? level - 1 : -1;
  const Tag = tags[index] ?? 'h6';

  return (
    <Tag className={joinClassNames(sizeClass(size), className)} id={id} title={title}>
      {children}
    </Tag>
  );
};
