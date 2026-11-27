import { useRef } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { ModalWindow, type ModalWindowApi } from '@ksojecki/ui/overlays';
import { Paragraph } from '@ksojecki/ui/typography';

export default function ModalWindowBasic() {
  const modal = useRef<ModalWindowApi>(null);

  return (
    <>
      <Button onClick={() => modal.current?.show()} purpose="edit">
        Edit item
      </Button>
      <ModalWindow
        actions={
          <Button onClick={() => modal.current?.close()} purpose="cancel">
            Close
          </Button>
        }
        api={modal}
        closeLabel="Close dialog"
        title="Edit item"
      >
        <Paragraph>Dialog content. Escape and the close button close it.</Paragraph>
      </ModalWindow>
    </>
  );
}
