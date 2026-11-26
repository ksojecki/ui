import { useEffect, useState, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import { Dropdown } from '../navigation/Dropdown';

type CallyElement<T = object> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & T;

interface CalendarDateElement extends HTMLElement {
  value: string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'calendar-date': CallyElement<{
        class?: string;
        locale?: string;
        min?: string;
        max?: string;
        onchange?: (event: Event & { target: CalendarDateElement }) => void;
        value?: string;
      }>;
      'calendar-month': CallyElement;
    }
  }
}

function formatDate(value: string, locale: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) {
    return '—';
  }
  return new Date(year, month - 1, day).toLocaleDateString(locale);
}

interface DatePickerProps {
  id: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  /** BCP 47 tag for the trigger text and the calendar. */
  locale: string;
  previousLabel: string;
  nextLabel: string;
  onChange: (value: string) => void;
  value: string;
}

export function DatePicker({
  id,
  min,
  max,
  onChange,
  value,
  disabled,
  locale,
  previousLabel,
  nextLabel,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  // cally touches `document` on import, so load it on the client only to keep SSR working.
  useEffect(() => {
    void import('cally');
  }, []);
  // Closing while disabled keeps the calendar from reopening when the control is enabled again.
  const [wasDisabled, setWasDisabled] = useState(disabled);
  if (disabled !== wasDisabled) {
    setWasDisabled(disabled);
    if (disabled) {
      setOpen(false);
    }
  }

  return (
    <Dropdown
      disabled={disabled}
      onOpenChange={setOpen}
      open={open}
      trigger={formatDate(value, locale)}
      triggerClassName="w-full justify-start"
      triggerId={id}
      triggerSize="sm"
    >
      <calendar-date
        class="cally"
        locale={locale}
        ref={(element) => {
          if (min) {
            element?.setAttribute('min', min);
          }
          if (max) {
            element?.setAttribute('max', max);
          }
        }}
        onchange={(event) => {
          onChange(event.target.value);
          setOpen(false);
        }}
        value={value}
      >
        <svg
          aria-label={previousLabel}
          className="size-4 fill-current"
          slot="previous"
          viewBox="0 0 24 24"
        >
          <path d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <svg aria-label={nextLabel} className="size-4 fill-current" slot="next" viewBox="0 0 24 24">
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <calendar-month />
      </calendar-date>
    </Dropdown>
  );
}
