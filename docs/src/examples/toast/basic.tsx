import { useState } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { Toast, ToastRegion } from '@ksojecki/ui/feedback';

export default function ToastBasic() {
  const [shown, setShown] = useState(false);

  return (
    <>
      <Button onClick={() => setShown(true)} purpose="save">
        Save
      </Button>
      <ToastRegion>
        {shown && (
          <Toast dismissLabel="Dismiss" onDismiss={() => setShown(false)} purpose="success">
            Saved.
          </Toast>
        )}
      </ToastRegion>
    </>
  );
}
