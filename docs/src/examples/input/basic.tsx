import { Input } from '@ksojecki/ui/forms';

export default function InputBasic() {
  return (
    <div className="flex max-w-sm flex-col gap-3">
      <Input hint="Use a short, descriptive name." label="Name" placeholder="Desk lamp" />
      <Input defaultValue="12,x" error="Enter a valid quantity." label="Quantity" />
      <Input defaultValue="Locked" disabled label="Disabled" />
    </div>
  );
}
