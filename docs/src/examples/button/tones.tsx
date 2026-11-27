import { Button } from '@ksojecki/ui/actions';

export default function ButtonTones() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button tone="primary">Primary</Button>
        <Button tone="secondary">Secondary</Button>
        <Button tone="neutral">Neutral</Button>
        <Button tone="ghost">Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button tone="primary" variant="soft">
          Soft
        </Button>
        <Button tone="primary" variant="outline">
          Outline
        </Button>
        <Button tone="error" variant="outline">
          Error outline
        </Button>
      </div>
    </div>
  );
}
