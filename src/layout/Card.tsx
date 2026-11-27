import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  actions?: ReactNode;
  /** Use `article` for a self-contained item in a list, such as an account. */
  as?: 'section' | 'article';
  children: ReactNode;
  className?: string;
  size?: CardSize;
  title?: ReactNode;
}

const CARD_BASE_CLASS_NAME = 'card bg-base-100 shadow';
const CARD_BODY_CLASS_NAME = 'card-body';
const CARD_ACTIONS_CLASS_NAME = 'card-actions justify-end';

// Literal class names so Tailwind's scanner picks them up.
const CARD_SIZE_CLASS_NAMES: Record<CardSize, string> = {
  sm: 'card-sm',
  md: 'card-md',
  lg: 'card-lg',
};

/**
 * Reusable content container for grouping related UI sections.
 *
 * @example
 * ```tsx
 * <Card actions={<Button purpose="edit">Change</Button>} title="Plan">
 *   <Paragraph>Pro, billed yearly.</Paragraph>
 * </Card>
 * ```
 */
export function Card({
  actions,
  as: Element = 'section',
  children,
  className,
  size = 'md',
  title,
  ...rest
}: CardProps) {
  return (
    <Element
      {...rest}
      className={joinClassNames(CARD_BASE_CLASS_NAME, CARD_SIZE_CLASS_NAMES[size], className)}
    >
      <div className={CARD_BODY_CLASS_NAME}>
        {title !== undefined ? <div className="card-title">{title}</div> : null}
        <div>{children}</div>
        {actions !== undefined ? <div className={CARD_ACTIONS_CLASS_NAME}>{actions}</div> : null}
      </div>
    </Element>
  );
}
