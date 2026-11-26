import type { ReactNode } from 'react';
import { DeleteButton, IconButton } from '../actions';
import { joinClassNames } from '../internal/classNames';
import { TbX } from '../icons';
import { Alert } from './Alert';

export interface ConfirmDeletePanelProps {
  /** Content shown before the warning, such as a reassignment choice. */
  children?: ReactNode;
  className?: string;
  /** Non-announced warning about what the delete does. */
  warning?: ReactNode;
  /** Error from the last attempt, announced as an alert. */
  error?: ReactNode;
  /** Disables both buttons while the delete request runs. */
  saving?: boolean;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Inline confirmation for a destructive action: optional content, warning, error, then cancel and delete. */
export const ConfirmDeletePanel = ({
  cancelLabel,
  children,
  className,
  confirmLabel,
  error,
  onCancel,
  onConfirm,
  saving = false,
  warning,
}: ConfirmDeletePanelProps) => (
  <div className={joinClassNames('space-y-3', className)}>
    {children}
    {warning ? (
      <Alert announce={false} purpose="warning">
        {warning}
      </Alert>
    ) : null}
    {error ? <Alert purpose="error">{error}</Alert> : null}
    <div className="flex justify-end gap-2">
      <IconButton
        disabled={saving}
        icon={<TbX />}
        label={cancelLabel}
        onClick={onCancel}
        size="sm"
      />
      <DeleteButton disabled={saving} label={confirmLabel} onClick={onConfirm} size="sm" />
    </div>
  </div>
);
