import { Textarea } from '@ksojecki/ui/forms';

export default function TextareaBasic() {
  return (
    <div className="max-w-sm">
      <Textarea
        hint="Visible only to you."
        label="Note"
        placeholder="Anything to remember"
        rows={3}
      />
    </div>
  );
}
