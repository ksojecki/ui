import { ConfirmDeletePanel } from '@ksojecki/ui/feedback';

export default function ConfirmDeletePanelBasic() {
  return (
    <ConfirmDeletePanel
      cancelLabel="Keep it"
      confirmLabel="Delete"
      onCancel={() => undefined}
      onConfirm={() => undefined}
      warning="This also removes its 12 entries. You cannot undo it."
    >
      Delete the list “Groceries”?
    </ConfirmDeletePanel>
  );
}
