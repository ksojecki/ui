import { useId, type ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export type ControlSize = 'xs' | 'sm' | 'md' | 'lg';

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  /** Id of the single control inside `children`; the legend label points at it. Omit for a group of controls. */
  controlId?: string;
  /** Base id for the message paragraphs when there is no `controlId`, so controls can reference them. */
  id?: string;
  children: ReactNode;
  className?: string;
}

/** Ids of the hint and error paragraphs, derived from the control id. */
export const fieldIds = (controlId: string) => ({
  hint: `${controlId}-hint`,
  error: `${controlId}-error`,
});

/**
 * `aria-describedby` value for a control: the caller's ids first, then only the messages that are rendered.
 * Returns undefined when there is nothing to list.
 */
export function fieldDescribedBy(
  controlId: string,
  hint?: string,
  error?: string,
  callerIds?: string,
) {
  const ids = fieldIds(controlId);
  return [callerIds, hint && ids.hint, error && ids.error].filter(Boolean).join(' ') || undefined;
}

/** Hint (muted) or error (alert) text under a field or a checkbox. daisyUI's `label` never wraps, so long text needs `whitespace-normal`. */
export function FieldMessage({
  children,
  id,
  tone = 'hint',
}: {
  children: ReactNode;
  id?: string;
  tone?: 'hint' | 'error';
}) {
  return tone === 'error' ? (
    <p className="label whitespace-normal text-error" id={id} role="alert">
      {children}
    </p>
  ) : (
    <p className="label whitespace-normal" id={id}>
      {children}
    </p>
  );
}

/** The hint and error paragraphs of a control, with the ids `fieldDescribedBy` references. */
export function FieldMessages({
  controlId,
  hint,
  error,
}: {
  controlId: string;
  hint?: string;
  error?: string;
}) {
  const ids = fieldIds(controlId);
  return (
    <>
      {hint ? <FieldMessage id={ids.hint}>{hint}</FieldMessage> : null}
      {error ? (
        <FieldMessage id={ids.error} tone="error">
          {error}
        </FieldMessage>
      ) : null}
    </>
  );
}

/**
 * Shared labelled form group: a fieldset whose legend names the control,
 * with an optional muted hint and an optional error message.
 * Without `controlId` it labels a group of controls (radios, checkboxes) instead.
 * `id` sets the base id of the message paragraphs when a group needs to reference them.
 */
export function Field({ label, hint, error, controlId, id, children, className }: FieldProps) {
  const generatedId = useId();
  const baseId = id ?? controlId ?? generatedId;

  return (
    <fieldset
      aria-describedby={controlId ? undefined : fieldDescribedBy(baseId, hint, error)}
      className={joinClassNames('fieldset', className)}
    >
      <legend className="fieldset-legend">
        {controlId ? <label htmlFor={controlId}>{label}</label> : label}
      </legend>
      {children}
      <FieldMessages controlId={baseId} error={error} hint={hint} />
    </fieldset>
  );
}
