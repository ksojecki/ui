import { Prose } from '@ksojecki/ui/typography';

export default function ProseBasic() {
  return (
    <Prose>
      <h2>Privacy policy</h2>
      <p>
        Prose caps the line length at about 65 characters and spaces the headings, paragraphs and
        lists inside it, so plain HTML reads well.
      </p>
      <ul>
        <li>What we collect</li>
        <li>How long we keep it</li>
      </ul>
    </Prose>
  );
}
