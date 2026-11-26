import { useState } from 'react';
import { Button } from '@ksojecki/ui/actions';
import { BottomSheet, Card, Disclosure, Divider, PageHeader, Section } from '@ksojecki/ui/layout';
import { Badge } from '@ksojecki/ui/feedback';
import { Paragraph } from '@ksojecki/ui/typography';
import { Specimen } from '../Specimen';

export function LayoutSection() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Section description="@ksojecki/ui/layout" id="layout" title="Layout">
      <div className="flex flex-col gap-6">
        <Specimen title="Card sizes">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Card
              actions={<Button size="sm">Open</Button>}
              key={size}
              size={size}
              title={`Card ${size}`}
            >
              <Paragraph>Monthly summary for March.</Paragraph>
            </Card>
          ))}
        </Specimen>
        <Specimen title="Section (default and plain)">
          <Section description="Boxed section" title="Default">
            <Paragraph>Content</Paragraph>
          </Section>
          <Section appearance="plain" description="Unboxed section" title="Plain">
            <Paragraph>Content</Paragraph>
          </Section>
        </Specimen>
        <Specimen title="Disclosure / Divider">
          <Disclosure bordered summary="Advanced options">
            <Paragraph>Hidden until opened.</Paragraph>
          </Disclosure>
          <Disclosure open summary="Open by default">
            <Paragraph>Visible content.</Paragraph>
          </Disclosure>
          <div className="w-full">
            <Divider>Or</Divider>
          </div>
        </Specimen>
        <Specimen title="PageHeader">
          <div className="w-full">
            <PageHeader
              actions={<Button purpose="create">New</Button>}
              description="Browse and manage saved items."
              eyebrow="Library"
              meta={<Badge purpose="info">3 items</Badge>}
              title="Saved items"
            />
            <PageHeader appearance="plain" title="Plain header" />
          </div>
        </Specimen>
        <Specimen title="BottomSheet">
          <Button onClick={() => setSheetOpen((open) => !open)}>Toggle sheet</Button>
          <div className="flex h-56 w-full flex-col overflow-hidden rounded-box border border-base-300">
            <div className="flex-1 p-3">
              <Paragraph tone="muted">Page content above the sheet.</Paragraph>
            </div>
            <BottomSheet
              onOpenChange={setSheetOpen}
              open={sheetOpen}
              summary="3 results found"
              title="Results"
            >
              <Paragraph>Result details go here.</Paragraph>
            </BottomSheet>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
