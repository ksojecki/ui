import { Paragraph } from '@ksojecki/ui/typography';

export default function ParagraphBasic() {
  return (
    <div className="flex flex-col gap-2">
      <Paragraph>Default paragraph text.</Paragraph>
      <Paragraph tone="muted">Muted text for secondary information.</Paragraph>
    </div>
  );
}
