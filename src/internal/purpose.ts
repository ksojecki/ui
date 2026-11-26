import type { ButtonTone, ButtonVariant } from '../actions/Button';

export type ActionPurpose =
  | 'save'
  | 'cancel'
  | 'delete'
  | 'create'
  | 'edit'
  | 'confirm'
  | 'neutral';

export type StatusPurpose = 'info' | 'success' | 'warning' | 'error';

export const ACTION_PURPOSES: Record<ActionPurpose, { tone: ButtonTone; variant: ButtonVariant }> =
  {
    save: { tone: 'primary', variant: 'solid' },
    confirm: { tone: 'primary', variant: 'solid' },
    create: { tone: 'primary', variant: 'soft' },
    edit: { tone: 'neutral', variant: 'soft' },
    delete: { tone: 'error', variant: 'soft' },
    cancel: { tone: 'default', variant: 'solid' },
    neutral: { tone: 'default', variant: 'solid' },
  };
