import { FieldMessage, FieldMessages } from '@ksojecki/ui/forms';

export default function FieldMessagesExample() {
  return (
    <div className="flex flex-col gap-2">
      <FieldMessage>Hint text under a control.</FieldMessage>
      <FieldMessage tone="error">Error text under a control.</FieldMessage>
      <FieldMessages controlId="email" error="Enter an email address." hint="We never share it." />
    </div>
  );
}
