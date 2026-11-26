import { marked } from 'marked';
import { Section } from '@ksojecki/ui/layout';
import { Prose } from '@ksojecki/ui/typography';
import readme from '../../../README.md?raw';

// Consumer-facing part of the README: everything between the title and the License heading.
const guide = readme.slice(readme.indexOf('\n'), readme.indexOf('\n## License')).trim();
const html = marked.parse(guide, { async: false });

export function GuideSection() {
  return (
    <Section
      appearance="plain"
      description="Install, set up styles and use @ksojecki/ui"
      id="guide"
      title="Guide"
    >
      <Prose className="guide max-w-3xl">
        <div className="flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>
    </Section>
  );
}
