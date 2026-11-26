import { useState } from 'react';
import { Button } from '../actions/Button';
import { Dropdown } from '../navigation/Dropdown';

interface TimePickerProps {
  id: string;
  value: string;
  max?: string;
  disabled?: boolean;
  label: string;
  selectHourLabel: string;
  selectMinuteLabel: string;
  changeHourLabel: string;
  onChange: (value: string) => void;
}

function HourChoices({
  maxHour,
  label,
  onSelect,
}: {
  maxHour: number;
  label: string;
  onSelect: (hour: number) => void;
}) {
  return (
    <fieldset
      aria-label={label}
      className="grid max-h-48 min-w-0 grid-cols-4 gap-1 overflow-y-auto border-0 p-0"
    >
      <legend className="col-span-4 mb-1 text-sm font-medium">{label}</legend>
      {Array.from({ length: maxHour + 1 }, (_, hour) => (
        <Button key={hour} onClick={() => onSelect(hour)} purpose="neutral" size="sm">
          {String(hour).padStart(2, '0')}
        </Button>
      ))}
    </fieldset>
  );
}

function MinuteChoices({
  hour,
  maxHour,
  maxMinute,
  label,
  changeHourLabel,
  onChangeHour,
  onSelect,
}: {
  hour: number;
  maxHour: number;
  maxMinute: number;
  label: string;
  changeHourLabel: string;
  onChangeHour: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset aria-label={label} className="grid min-w-0 grid-cols-4 gap-1 border-0 p-0">
      <legend className="sr-only">{label}</legend>
      <div className="col-span-4 mb-1 flex items-center justify-between text-sm font-medium">
        <span aria-hidden="true">{label}</span>
        <Button onClick={onChangeHour} purpose="cancel" size="xs">
          {changeHourLabel}
        </Button>
      </div>
      {Array.from({ length: 12 }, (_, index) => index * 5)
        .filter((minute) => hour < maxHour || minute <= maxMinute)
        .map((minute) => (
          <Button
            key={minute}
            onClick={() =>
              onSelect(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
            }
            purpose="neutral"
            size="sm"
          >
            {String(minute).padStart(2, '0')}
          </Button>
        ))}
    </fieldset>
  );
}

export function TimePicker({
  id,
  value,
  max = '23:59',
  disabled,
  label,
  selectHourLabel,
  selectMinuteLabel,
  changeHourLabel,
  onChange,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [draftHour, setDraftHour] = useState<number | null>(null);
  const [maxHour, maxMinute] = max.split(':').map(Number);

  // Closed while locked, so the popup stays shut when the form is enabled again.
  const [wasDisabled, setWasDisabled] = useState(disabled);
  if (disabled !== wasDisabled) {
    setWasDisabled(disabled);
    if (disabled) {
      setOpen(false);
    }
  }

  return (
    <Dropdown
      contentClassName="w-64"
      disabled={disabled}
      onOpenChange={(next) => {
        setOpen(next);
        setDraftHour(null);
      }}
      open={open}
      trigger={value}
      triggerClassName="w-full justify-start"
      triggerId={id}
      triggerLabel={value ? `${label}, ${value}` : label}
      triggerSize="sm"
    >
      {draftHour === null ? (
        <HourChoices label={selectHourLabel} maxHour={maxHour} onSelect={setDraftHour} />
      ) : (
        <MinuteChoices
          changeHourLabel={changeHourLabel}
          hour={draftHour}
          label={selectMinuteLabel}
          maxHour={maxHour}
          maxMinute={maxMinute}
          onChangeHour={() => setDraftHour(null)}
          onSelect={(time) => {
            onChange(time);
            setDraftHour(null);
            setOpen(false);
          }}
        />
      )}
    </Dropdown>
  );
}
