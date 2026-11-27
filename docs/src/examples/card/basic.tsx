import { Button } from '@ksojecki/ui/actions';
import { Card } from '@ksojecki/ui/layout';
import { Paragraph } from '@ksojecki/ui/typography';

export default function CardBasic() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card actions={<Button purpose="edit">Edit</Button>} title="Desk lamp">
        <Paragraph tone="muted">Warm light, 129 zł.</Paragraph>
      </Card>
      <Card as="article" size="sm" title="Small card">
        <Paragraph tone="muted">Less padding.</Paragraph>
      </Card>
    </div>
  );
}
