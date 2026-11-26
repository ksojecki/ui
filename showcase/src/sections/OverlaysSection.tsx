import { useRef, useState } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { Section } from '@ksojecki/ui/layout';
import {
  ConsentSettings,
  ModalWindow,
  NativeDialog,
  type ModalWindowApi,
} from '@ksojecki/ui/overlays';
import { Paragraph } from '@ksojecki/ui/typography';
import { Specimen } from '../Specimen';

export function OverlaysSection() {
  const modal = useRef<ModalWindowApi | null>(null);
  const dialog = useRef<ModalWindowApi | null>(null);
  const [consentOpen, setConsentOpen] = useState(false);

  return (
    <Section description="@ksojecki/ui/overlays" id="overlays" title="Overlays">
      <Specimen title="ModalWindow / NativeDialog">
        <Button onClick={() => modal.current?.show()}>Open ModalWindow</Button>
        <Button onClick={() => dialog.current?.show()} tone="neutral">
          Open NativeDialog
        </Button>
        <ModalWindow
          actions={
            <Button onClick={() => modal.current?.close()} purpose="cancel">
              Close
            </Button>
          }
          api={modal}
          closeLabel="Close dialog"
          size="md"
          title="Edit item"
        >
          <Paragraph>Edit the item details before saving.</Paragraph>
        </ModalWindow>
        <NativeDialog api={dialog} backdropLabel="Close" size="sm" title="Native dialog">
          <Paragraph>Plain dialog box.</Paragraph>
          <Button onClick={() => dialog.current?.close()} purpose="cancel">
            Close
          </Button>
        </NativeDialog>
      </Specimen>
      <Specimen title="ConsentSettings">
        <Button onClick={() => setConsentOpen(true)}>Open consent settings</Button>
        <ConsentSettings
          acceptAllLabel="Accept all"
          closeLabel="Close consent settings"
          intro="Choose which categories we may use."
          necessaryDescription="Required for the site to work."
          necessaryLabel="Necessary"
          onAcceptAll={() => setConsentOpen(false)}
          onClose={() => setConsentOpen(false)}
          onSave={() => setConsentOpen(false)}
          open={consentOpen}
          policyLink={{ label: 'Privacy policy', to: '/privacy' }}
          rumDescription="Helps us understand page performance."
          rumEnabled={false}
          rumLabel="Usage statistics"
          saveLabel="Save choice"
          title="Cookie settings"
        />
      </Specimen>
    </Section>
  );
}
