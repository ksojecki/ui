import { FileInput } from '@ksojecki/ui/forms';

export default function FileInputBasic() {
  return (
    <div className="max-w-sm">
      <FileInput accept="application/pdf" hint="PDF up to 5 MB." label="Attachment" />
    </div>
  );
}
