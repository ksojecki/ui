import type { ReactNode } from 'react';
import { Button } from '../actions/Button';
import { Alert } from '../feedback/Alert';

export interface FormActionsProps {
  /** Shown above the buttons as an assertive error alert. */
  error?: ReactNode;
  /** Disables both buttons and switches the save label to `savingLabel`. */
  saving?: boolean;
  saveLabel: ReactNode;
  savingLabel?: ReactNode;
  cancelLabel: ReactNode;
  onCancel: () => void;
  className?: string;
}

/**
 * Error alert plus submit and cancel buttons for the end of a form.
 *
 * @example
 * ```tsx
 * <FormActions
 *   cancelLabel="Cancel"
 *   error={saveError}
 *   onCancel={close}
 *   saveLabel="Save"
 *   saving={isSaving}
 *   savingLabel="Saving"
 * />
 * ```
 */
export const FormActions = ({
  cancelLabel,
  className,
  error,
  onCancel,
  saveLabel,
  saving = false,
  savingLabel,
}: FormActionsProps) => (
  <div className={className}>
    {error ? (
      <Alert aria-live="assertive" className="mb-3" purpose="error">
        {error}
      </Alert>
    ) : null}
    <div className="flex gap-2">
      <Button disabled={saving} purpose="save" size="sm" type="submit">
        {saving && savingLabel ? savingLabel : saveLabel}
      </Button>
      <Button disabled={saving} onClick={onCancel} purpose="cancel" size="sm">
        {cancelLabel}
      </Button>
    </div>
  </div>
);
