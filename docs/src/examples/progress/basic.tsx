import { Progress } from '@ksojecki/ui/feedback';

export default function ProgressBasic() {
  return (
    <div className="flex max-w-sm flex-col gap-3">
      <Progress label="Upload" value={40} />
      <Progress label="Budget used" purpose="warning" value={85} />
      <Progress
        label="Budget used, with a target marker"
        marker={70}
        purpose="success"
        value={55}
      />
    </div>
  );
}
