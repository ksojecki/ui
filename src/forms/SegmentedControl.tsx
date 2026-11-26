import { Button, type ButtonSize } from '../actions/Button';

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Accessible name of the group. */
  label: string;
  /** Stretch to the container width and share it equally between options. */
  fullWidth?: boolean;
  onChange: (value: string) => void;
  options: SegmentedOption[];
  size?: ButtonSize;
  value: string;
}

const TRACK_CLASS_NAME = 'gap-1 rounded-field border border-(--control-border) bg-base-200 p-1';

/** Single-selection toggle group: a bordered track with the selected option as a bordered sheet-coloured pill. */
export const SegmentedControl = ({
  fullWidth = false,
  label,
  onChange,
  options,
  size,
  value,
}: SegmentedControlProps) => (
  <fieldset
    aria-label={label}
    className={fullWidth ? `flex w-full ${TRACK_CLASS_NAME}` : `inline-flex ${TRACK_CLASS_NAME}`}
  >
    {options.map((option) => {
      const selected = option.value === value;

      return (
        <Button
          aria-pressed={selected}
          className={fullWidth ? 'flex-1 px-1 whitespace-nowrap' : undefined}
          disabled={option.disabled}
          key={option.value}
          onClick={() => onChange(option.value)}
          size={size}
          tone={selected ? 'default' : 'ghost'}
        >
          {option.label}
        </Button>
      );
    })}
  </fieldset>
);
