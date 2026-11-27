import { Heading } from '@ksojecki/ui/typography';

export default function HeadingBasic() {
  return (
    <div className="flex flex-col gap-2">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={2} size={4}>
        Level 2, sized as 4
      </Heading>
      <Heading level={3} size="label">
        Label size
      </Heading>
    </div>
  );
}
