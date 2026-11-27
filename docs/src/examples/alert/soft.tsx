import { Alert } from '@ksojecki/ui/feedback';

export default function AlertSoft() {
  return (
    <div className="flex flex-col gap-3">
      <Alert purpose="info" variant="soft">
        A soft alert for less urgent notes.
      </Alert>
      <Alert announce purpose="error" variant="soft">
        Announced to screen readers as soon as it appears.
      </Alert>
    </div>
  );
}
