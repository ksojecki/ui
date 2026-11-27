import { Disclosure } from '@ksojecki/ui/layout';
import { Paragraph } from '@ksojecki/ui/typography';

export default function DisclosureBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Disclosure bordered summary="How is the total calculated?">
        <Paragraph>It adds every entry of the month, including refunds.</Paragraph>
      </Disclosure>
      <Disclosure open summary="Open by default">
        <Paragraph>Enter and Space toggle it.</Paragraph>
      </Disclosure>
    </div>
  );
}
