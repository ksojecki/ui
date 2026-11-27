import { Input } from '@ksojecki/ui/forms';

export default function InputBare() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input aria-label="Search" controlSize="sm" fullWidth={false} placeholder="Search" />
      <Input aria-label="Search" fullWidth={false} placeholder="Search" />
    </div>
  );
}
