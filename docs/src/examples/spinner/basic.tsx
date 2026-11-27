import { Spinner } from '@ksojecki/ui/feedback';

export default function SpinnerBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner label="Loading items" />
      <Spinner size="lg" />
    </div>
  );
}
