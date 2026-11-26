import { cloneElement, useId, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { joinClassNames } from '../internal/classNames';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends ComponentPropsWithoutRef<'span'> {
  /** A single focusable element. The tip shows on hover and, in daisyUI, on focus. */
  children: ReactElement<{ 'aria-describedby'?: string }>;
  position?: TooltipPosition;
  text: string;
}

// Literal class names so Tailwind's scanner picks them up.
const TOOLTIP_POSITION_CLASS_NAMES: Record<TooltipPosition, string> = {
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
  right: 'tooltip-right',
};

/** Shows `text` on the child. The text is also linked to the child via `aria-describedby`. */
export const Tooltip = ({ children, className, position = 'top', text, ...rest }: TooltipProps) => {
  const id = useId();
  // Keep any description the child already has; the tip text is appended to it.
  const describedBy = [children.props['aria-describedby'], id].filter(Boolean).join(' ');

  return (
    <span
      {...rest}
      className={joinClassNames('tooltip', TOOLTIP_POSITION_CLASS_NAMES[position], className)}
      data-tip={text}
    >
      {cloneElement(children, { 'aria-describedby': describedBy })}
      <span className="sr-only" id={id}>
        {text}
      </span>
    </span>
  );
};
