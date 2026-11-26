import type { ComponentPropsWithoutRef } from 'react';
import type { StatusPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type ProgressPurpose = StatusPurpose | 'neutral';

export interface ProgressProps extends Omit<ComponentPropsWithoutRef<'progress'>, 'value' | 'max'> {
  /** Accessible name announced with the value. Required. */
  label: string;
  /** Upper bound of the meter. Defaults to 100. */
  max?: number;
  /** Position of a thin tick over the bar, in the same unit as `max`. Clamped into [0, max]. */
  marker?: number;
  /** Semantic meaning of the meter. Colour is derived from it. */
  purpose?: ProgressPurpose;
  /** Current amount. Clamped into [0, max]. */
  value: number;
}

// Literal class names so Tailwind's scanner picks them up.
const PROGRESS_PURPOSE_CLASS_NAMES: Record<ProgressPurpose, string> = {
  neutral: 'progress-neutral',
  info: 'progress-info',
  success: 'progress-success',
  warning: 'progress-warning',
  error: 'progress-error',
};

const clamp = (amount: number, max: number) => Math.min(Math.max(amount, 0), max);

/** Determinate meter. Pass `label` so assistive tech can name it. */
export const Progress = ({
  className,
  label,
  marker,
  max = 100,
  purpose = 'neutral',
  value,
  ...rest
}: ProgressProps) => {
  const meter = (
    <progress
      {...rest}
      aria-label={label}
      className={joinClassNames('progress', PROGRESS_PURPOSE_CLASS_NAMES[purpose], className)}
      max={max}
      value={clamp(value, max)}
    />
  );

  if (marker === undefined) {
    return meter;
  }

  const markerPercent = max > 0 ? (clamp(marker, max) / max) * 100 : 0;

  // Flex keeps the progress on one line so the tick centres on the bar.
  return (
    <div className="relative flex">
      {meter}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base-content"
        style={{ left: `${markerPercent}%` }}
      />
    </div>
  );
};
