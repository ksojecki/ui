import { Button } from '@ksojecki/ui/actions';
import { Alert, Badge } from '@ksojecki/ui/feedback';
import { Card } from '@ksojecki/ui/layout';

export default function OverviewExample() {
  return (
    <Card actions={<Button purpose="save">Save</Button>} title="Monthly budget">
      <div className="flex flex-col gap-3">
        <Badge purpose="success">On track</Badge>
        <Alert purpose="info" variant="soft">
          You have 860 zł left this month.
        </Alert>
      </div>
    </Card>
  );
}
