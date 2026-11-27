import { Badge } from '@ksojecki/ui/feedback';

export default function BadgeBasic() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Badge purpose="neutral">Draft</Badge>
        <Badge purpose="info">New</Badge>
        <Badge purpose="success">Paid</Badge>
        <Badge purpose="warning">Due soon</Badge>
        <Badge purpose="error">Overdue</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge purpose="success" variant="soft">
          Soft
        </Badge>
        <Badge purpose="success" variant="outline">
          Outline
        </Badge>
        <Badge size="xs">xs</Badge>
        <Badge size="lg">lg</Badge>
      </div>
    </div>
  );
}
