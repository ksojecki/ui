import { Page } from '@ksojecki/ui/layout';
import { Paragraph } from '@ksojecki/ui/typography';

export default function PageBasic() {
  return (
    <Page>
      <Page.Title>Settings</Page.Title>
      <Page.Content>
        <Paragraph>The page title is a level-1 heading; the content follows it.</Paragraph>
      </Page.Content>
    </Page>
  );
}
