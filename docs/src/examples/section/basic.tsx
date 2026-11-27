import { Button } from '@ksojecki/ui/actions';
import { Section } from '@ksojecki/ui/layout';
import { Paragraph } from '@ksojecki/ui/typography';

export default function SectionBasic() {
  return (
    <div className="flex flex-col gap-4">
      <Section
        actions={<Button purpose="create">Add</Button>}
        description="Everything you buy every week."
        title="Groceries"
      >
        <Paragraph>Section content.</Paragraph>
      </Section>
      <Section appearance="plain" title="Plain section">
        <Paragraph>No frame.</Paragraph>
      </Section>
    </div>
  );
}
