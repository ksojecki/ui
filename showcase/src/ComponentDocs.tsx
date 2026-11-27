import { marked } from 'marked';
import components from 'virtual:ui-component-docs';
import type { ComponentDoc, PropDoc } from 'virtual:ui-component-docs';
import { DataTable } from '@ksojecki/ui/data';
import type { DataTableColumn } from '@ksojecki/ui/data';
import { Badge } from '@ksojecki/ui/feedback';
import { Disclosure } from '@ksojecki/ui/layout';
import { Paragraph } from '@ksojecki/ui/typography';

const API_REFERENCE = `${import.meta.env.BASE_URL}docs/`;

function inlineMarkdown(text: string) {
  return { __html: marked.parseInline(text, { async: false }) };
}

const PROP_COLUMNS: DataTableColumn<PropDoc>[] = [
  {
    key: 'name',
    header: 'Prop',
    render: (prop) => (
      <span className="flex items-center gap-2">
        <code>{prop.name}</code>
        {prop.required ? <Badge size="xs">required</Badge> : null}
      </span>
    ),
  },
  {
    key: 'type',
    render: (prop) => (
      <span className="flex flex-col gap-1">
        <code className="w-fit whitespace-normal">{prop.type}</code>
        {prop.options.length > 0 && !prop.type.includes('|') ? (
          <span className="text-xs whitespace-normal">{prop.options.join(' | ')}</span>
        ) : null}
      </span>
    ),
  },
  {
    key: 'defaultValue',
    header: 'Default',
    format: (value) => (value ? <code>{value}</code> : '–'),
  },
  {
    key: 'description',
    render: (prop) => <span dangerouslySetInnerHTML={inlineMarkdown(prop.description)} />,
  },
];

function PropsTable({ name, props }: { name: string; props: PropDoc[] }) {
  if (props.length === 0) {
    return <Paragraph tone="muted">No own props; it passes its children through.</Paragraph>;
  }
  return (
    <DataTable
      columns={PROP_COLUMNS}
      getRowKey={(prop) => prop.name}
      label={`${name} props`}
      rows={props}
    />
  );
}

function Doc({ doc }: { doc: ComponentDoc }) {
  const code = `import { ${doc.name} } from '@ksojecki/ui/${doc.group}';${doc.example ? `\n\n${doc.example}` : ''}`;
  return (
    <Disclosure bordered id={`${doc.group}-${doc.name}`} summary={doc.name}>
      <div className="guide flex flex-col gap-3">
        {doc.description ? (
          <Paragraph>
            <span dangerouslySetInnerHTML={inlineMarkdown(doc.description)} />
          </Paragraph>
        ) : null}
        <pre>
          <code>{code}</code>
        </pre>
        <PropsTable name={doc.name} props={doc.props} />
      </div>
    </Disclosure>
  );
}

/** Description, usage and props of every component of one `@ksojecki/ui` subpath. */
export function ComponentDocs({ group }: { group: string }) {
  const docs = components.filter((doc) => doc.group === group);
  if (docs.length === 0) {
    return null;
  }
  return (
    <section aria-label={`${group} API`} className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">Components and props</span>
        <a className="link text-sm" href={`${API_REFERENCE}modules/_ksojecki_ui_${group}.html`}>
          API reference
        </a>
      </div>
      {docs.map((doc) => (
        <Doc doc={doc} key={doc.name} />
      ))}
    </section>
  );
}
