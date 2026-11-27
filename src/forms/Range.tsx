import type { ComponentPropsWithoutRef } from 'react';
import type { ControlSize } from './Field';
import type { StatusPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type RangePurpose = 'primary' | StatusPurpose;

export interface RangeProps extends Pick<
  ComponentPropsWithoutRef<'input'>,
  'disabled' | 'onPointerCancel' | 'onPointerDown' | 'onPointerUp'
> {
  /** Accessible name. Required because a range has no visible label here. */
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  purpose?: RangePurpose;
  size?: ControlSize;
  step?: number;
  value: number;
}

// Literal class names so Tailwind's scanner picks them up.
const RANGE_PURPOSE_CLASS_NAMES: Record<RangePurpose, string> = {
  primary: 'range-primary',
  info: 'range-info',
  success: 'range-success',
  warning: 'range-warning',
  error: 'range-error',
};

const RANGE_SIZE_CLASS_NAMES: Record<ControlSize, string> = {
  xs: 'range-xs',
  sm: 'range-sm',
  md: '',
  lg: 'range-lg',
};

/**
 * Shared slider. Keyboard arrows and Home/End come from the native input. Pointer props reach the input for drag handling.
 *
 * @example
 * ```tsx
 * <Range label="Volume" max={100} min={0} onChange={setVolume} value={volume} />
 * ```
 */
export const Range = ({
  label,
  max,
  min,
  onChange,
  purpose = 'primary',
  size = 'md',
  step,
  value,
  ...pointer
}: RangeProps) => {
  return (
    <input
      aria-label={label}
      className={joinClassNames(
        'range',
        RANGE_PURPOSE_CLASS_NAMES[purpose],
        RANGE_SIZE_CLASS_NAMES[size],
      )}
      max={max}
      min={min}
      onChange={(event) => onChange(Number(event.currentTarget.value))}
      step={step}
      type="range"
      value={value}
      {...pointer}
    />
  );
};
