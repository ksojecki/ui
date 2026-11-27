import { useState } from 'react';
import type { To } from 'react-router';
import { Button } from '../../actions/Button';
import { IconButton } from '../../actions/IconButton';
import { Switch } from '../../forms/Switch';
import { TbX } from '../../icons';
import { Link } from '../../navigation/Link';
import { Paragraph } from '../../typography/Paragraph';
import { NativeDialog } from '../ModalWindow/ModalWindow';

export interface ConsentSettingsProps {
  open: boolean;
  /** Current saved value of the optional usage-statistics switch. */
  rumEnabled: boolean;
  /** Receives the switch value; the caller decides when to close. */
  onSave: (rum: boolean) => void;
  onAcceptAll: () => void;
  onClose: () => void;
  title: string;
  intro: string;
  necessaryLabel: string;
  necessaryDescription: string;
  rumLabel: string;
  rumDescription: string;
  saveLabel: string;
  acceptAllLabel: string;
  closeLabel: string;
  policyLink: { label: string; to: To };
}

/**
 * Consent preferences dialog. The optional switch stays local until Save, and reopening resets it to `rumEnabled`.
 *
 * @example
 * ```tsx
 * <ConsentSettings
 *   acceptAllLabel="Accept all"
 *   closeLabel="Close"
 *   intro="Choose which categories we may use."
 *   necessaryDescription="Required for the site to work."
 *   necessaryLabel="Necessary"
 *   onAcceptAll={acceptAll}
 *   onClose={close}
 *   onSave={saveRum}
 *   open={isOpen}
 *   policyLink={{ label: 'Privacy policy', to: '/privacy' }}
 *   rumDescription="Helps us understand page performance."
 *   rumEnabled={rumEnabled}
 *   rumLabel="Usage statistics"
 *   saveLabel="Save"
 *   title="Privacy settings"
 * />
 * ```
 */
export function ConsentSettings({
  open,
  rumEnabled,
  onSave,
  onAcceptAll,
  onClose,
  title,
  intro,
  necessaryLabel,
  necessaryDescription,
  rumLabel,
  rumDescription,
  saveLabel,
  acceptAllLabel,
  closeLabel,
  policyLink,
}: ConsentSettingsProps) {
  const [rum, setRum] = useState(rumEnabled);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setRum(rumEnabled);
    }
  }

  return (
    <NativeDialog backdropLabel={closeLabel} onClose={onClose} open={open} size="md" title={title}>
      <div className="space-y-4 py-4">
        <Paragraph>{intro}</Paragraph>
        <Switch checked disabled hint={necessaryDescription} label={necessaryLabel} readOnly />
        <Switch
          checked={rum}
          hint={rumDescription}
          label={rumLabel}
          onChange={(event) => setRum(event.currentTarget.checked)}
        />
        <Link className="text-sm" to={policyLink.to}>
          {policyLink.label}
        </Link>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <IconButton
          className="absolute right-4 top-4 rounded-full"
          icon={<TbX className="h-4 w-4" />}
          label={closeLabel}
          onClick={onClose}
          size="sm"
        />
        <Button onClick={() => onSave(rum)} tone="neutral" variant="outline">
          {saveLabel}
        </Button>
        <Button onClick={onAcceptAll} tone="primary">
          {acceptAllLabel}
        </Button>
      </div>
    </NativeDialog>
  );
}
