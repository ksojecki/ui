import { FormActions } from '@ksojecki/ui/forms';

export default function FormActionsBasic() {
  return (
    <div className="flex flex-col gap-6">
      <FormActions cancelLabel="Cancel" onCancel={() => undefined} saveLabel="Save" />
      <FormActions
        cancelLabel="Cancel"
        onCancel={() => undefined}
        saveLabel="Save"
        saving
        savingLabel="Saving…"
      />
      <FormActions
        cancelLabel="Cancel"
        error="Could not save the item."
        onCancel={() => undefined}
        saveLabel="Save"
      />
    </div>
  );
}
