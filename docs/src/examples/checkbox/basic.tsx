import { Checkbox } from '@ksojecki/ui/forms';

export default function CheckboxBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox defaultChecked label="Remember me" />
      <Checkbox error="You must accept the terms." label="Accept terms" />
      <Checkbox disabled label="Disabled" />
    </div>
  );
}
