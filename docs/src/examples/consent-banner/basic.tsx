import { useState } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { ConsentBanner } from '@ksojecki/ui/overlays';

export default function ConsentBannerBasic() {
  const [shown, setShown] = useState(false);
  const hide = () => setShown(false);

  return (
    <>
      <Button onClick={() => setShown(true)} tone="neutral">
        Show banner
      </Button>
      {shown && (
        <ConsentBanner
          acceptLabel="Accept all"
          body="We use cookies to keep you signed in and, with your consent, to measure performance."
          onAccept={hide}
          onReject={hide}
          onSettings={hide}
          policyLink={{ label: 'Privacy policy', to: '/privacy' }}
          rejectLabel="Reject"
          settingsLabel="Settings"
          title="Cookies"
        />
      )}
    </>
  );
}
