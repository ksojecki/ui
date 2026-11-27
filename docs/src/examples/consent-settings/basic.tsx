import { useState } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { ConsentSettings } from '@ksojecki/ui/overlays';

export default function ConsentSettingsBasic() {
  const [open, setOpen] = useState(false);
  const [rum, setRum] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} tone="neutral">
        Cookie settings
      </Button>
      <ConsentSettings
        acceptAllLabel="Accept all"
        closeLabel="Close"
        intro="Choose which data we may collect."
        necessaryDescription="Needed to sign in and keep the site secure."
        necessaryLabel="Necessary"
        onAcceptAll={() => {
          setRum(true);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        onSave={(enabled) => {
          setRum(enabled);
          setOpen(false);
        }}
        open={open}
        policyLink={{ label: 'Privacy policy', to: '/privacy' }}
        rumDescription="Anonymous performance measurements."
        rumEnabled={rum}
        rumLabel="Performance"
        saveLabel="Save choices"
        title="Cookie settings"
      />
    </>
  );
}
