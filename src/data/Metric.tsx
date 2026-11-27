import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { StatusPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export interface MetricGroupProps {
  children: ReactNode;
  className?: string;
  /** Stacks the stats vertically. Default is horizontal, as daisyUI does. */
  vertical?: boolean;
  /** Stacks the stats below the `sm` breakpoint and lays them out in a row from `sm` up. Wins over `vertical`. */
  responsive?: boolean;
}

export type MetricAppearance = 'default' | 'boxed';

export interface MetricProps extends ComponentPropsWithoutRef<'div'> {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  figure?: ReactNode;
  /** `boxed` draws a bordered card around the figure. Default has no frame. */
  appearance?: MetricAppearance;
  /** Colour of the value. Omit for the default text colour. */
  tone?: StatusPurpose;
  /** Extra classes for the stat container, such as padding. */
  className?: string;
  /** Extra classes for the value, such as a font size. */
  valueClassName?: string;
}

const METRIC_APPEARANCE_CLASS_NAMES: Record<MetricAppearance, string | undefined> = {
  default: undefined,
  boxed: 'rounded-box border border-base-300 bg-base-100',
};

// Literal class names so Tailwind's scanner picks them up.
const STAT_TONE_CLASS_NAMES: Record<StatusPurpose, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

/**
 * Container for `Metric` items. Lay out with Tailwind classes passed in `className`.
 *
 * @example
 * ```tsx
 * <MetricGroup responsive>
 *   <Metric label="Items" value="128" />
 *   <Metric label="Out of stock" tone="error" value="5" />
 * </MetricGroup>
 * ```
 */
export const MetricGroup = ({
  children,
  className,
  responsive = false,
  vertical = false,
}: MetricGroupProps) => (
  <div
    className={joinClassNames(
      'stats',
      responsive ? 'stats-vertical sm:stats-horizontal' : vertical ? 'stats-vertical' : undefined,
      className,
    )}
  >
    {children}
  </div>
);

/**
 * One figure: a label, a value, and optional description and figure. `appearance="boxed"` frames it as a card.
 *
 * @example
 * ```tsx
 * <Metric appearance="boxed" description="vs. last month" label="Stock growth" tone="success" value="+12%" />
 * ```
 */
export const Metric = ({
  appearance = 'default',
  className,
  description,
  figure,
  label,
  tone,
  value,
  valueClassName,
  ...rest
}: MetricProps) => (
  <div
    {...rest}
    className={joinClassNames('stat', METRIC_APPEARANCE_CLASS_NAMES[appearance], className)}
  >
    {figure ? <div className="stat-figure">{figure}</div> : null}
    <div className="stat-title">{label}</div>
    <div
      className={joinClassNames(
        'stat-value',
        tone ? STAT_TONE_CLASS_NAMES[tone] : undefined,
        valueClassName,
      )}
    >
      {value}
    </div>
    {description ? <div className="stat-desc">{description}</div> : null}
  </div>
);
