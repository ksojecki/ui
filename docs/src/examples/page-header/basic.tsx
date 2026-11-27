import { Button } from '@ksojecki/ui/actions';
import { Badge } from '@ksojecki/ui/feedback';
import { PageHeader } from '@ksojecki/ui/layout';

export default function PageHeaderBasic() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        actions={<Button purpose="create">New budget</Button>}
        description="Plan and track monthly spending."
        eyebrow="Finance"
        meta={<Badge purpose="success">On track</Badge>}
        title="Budgets"
      />
      <PageHeader appearance="plain" title="Plain header" />
    </div>
  );
}
