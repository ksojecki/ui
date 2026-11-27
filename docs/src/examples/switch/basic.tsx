import { Switch } from '@ksojecki/ui/forms';

export default function SwitchBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Switch defaultChecked hint="Sends a weekly summary." label="Email digest" />
      <Switch error="Not available on your plan." label="Beta features" />
    </div>
  );
}
