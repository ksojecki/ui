import { Section } from '@ksojecki/ui/layout';
import { Heading, Paragraph, type HeadingLevel } from '@ksojecki/ui/typography';
import { Specimen } from '../Specimen';

const LEVELS: HeadingLevel[] = [1, 2, 3, 4];

export function TypographySection() {
  return (
    <Section description="@ksojecki/ui/typography" id="typography" title="Typography">
      <div className="flex flex-col gap-4">
        <Specimen title="Heading levels">
          <div className="flex flex-col gap-1">
            {LEVELS.map((level) => (
              <Heading key={level} level={level} size={level}>
                Heading level {level}
              </Heading>
            ))}
            <Heading level={3} size="label">
              Label size
            </Heading>
          </div>
        </Specimen>
        <Specimen title="Paragraph">
          <div className="flex flex-col gap-2">
            <Paragraph>Default paragraph text for body copy.</Paragraph>
            <Paragraph tone="muted">Muted paragraph text for secondary notes.</Paragraph>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
