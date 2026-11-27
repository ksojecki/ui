import { useRef } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { NativeDialog, type ModalWindowApi } from '@ksojecki/ui/overlays';
import { Paragraph } from '@ksojecki/ui/typography';

export default function NativeDialogExample() {
  const dialog = useRef<ModalWindowApi>(null);

  return (
    <>
      <Button onClick={() => dialog.current?.show()} tone="neutral">
        Open plain dialog
      </Button>
      <NativeDialog api={dialog} backdropLabel="Close" size="sm" title="Plain dialog">
        <Paragraph>A dialog box without the header and actions layout.</Paragraph>
        <Button onClick={() => dialog.current?.close()} purpose="cancel">
          Close
        </Button>
      </NativeDialog>
    </>
  );
}
