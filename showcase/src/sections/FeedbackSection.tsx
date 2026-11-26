import { useState } from 'react';
import { Button } from '@ksojecki/ui/actions';
import {
  Alert,
  Badge,
  ConfirmDeletePanel,
  EmptyState,
  Skeleton,
  Spinner,
  Toast,
  ToastRegion,
  Tooltip,
  type BadgePurpose,
  type StatusPurpose,
} from '@ksojecki/ui/feedback';
import { Section } from '@ksojecki/ui/layout';
import { Specimen } from '../Specimen';

const STATUSES: StatusPurpose[] = ['info', 'success', 'warning', 'error'];
const BADGES: BadgePurpose[] = ['neutral', ...STATUSES];

export function FeedbackSection() {
  const [toasts, setToasts] = useState<number[]>([]);

  return (
    <Section description="@ksojecki/ui/feedback" id="feedback" title="Feedback">
      <div className="flex flex-col gap-6">
        <Specimen title="Alert (solid and soft)">
          <div className="flex w-full flex-col gap-2">
            {STATUSES.flatMap((purpose) => [
              <Alert announce={false} key={purpose} purpose={purpose}>
                {purpose}: your changes were saved.
              </Alert>,
              <Alert announce={false} key={`${purpose}-soft`} purpose={purpose} variant="soft">
                {purpose} (soft): your changes were saved.
              </Alert>,
            ])}
          </div>
        </Specimen>
        <Specimen title="Badge purposes x variants x sizes">
          {BADGES.flatMap((purpose) =>
            (['solid', 'soft', 'outline'] as const).map((variant) => (
              <Badge key={`${purpose}-${variant}`} purpose={purpose} variant={variant}>
                {purpose}
              </Badge>
            )),
          )}
          {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
            <Badge key={size} size={size}>
              {size}
            </Badge>
          ))}
        </Specimen>
        <Specimen title="Toast">
          <Button onClick={() => setToasts((all) => [...all, Date.now()])}>Show toast</Button>
          <ToastRegion>
            {toasts.map((id) => (
              <Toast
                dismissLabel="Dismiss"
                key={id}
                onDismiss={() => setToasts((all) => all.filter((t) => t !== id))}
                purpose="success"
              >
                Item saved.
              </Toast>
            ))}
          </ToastRegion>
        </Specimen>
        <Specimen title="Spinner / Skeleton / Tooltip">
          {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
            <Spinner key={size} size={size} />
          ))}
          <Skeleton className="h-8 w-40" />
          <Tooltip position="bottom" text="Remove this item">
            <Button tone="neutral" variant="outline">
              Hover me
            </Button>
          </Tooltip>
        </Specimen>
        <Specimen title="ConfirmDeletePanel">
          <ConfirmDeletePanel
            cancelLabel="Keep"
            confirmLabel="Delete"
            error="Server unavailable."
            onCancel={() => undefined}
            onConfirm={() => undefined}
            warning="This item will be permanently removed."
          />
        </Specimen>
        <Specimen title="EmptyState">
          <div className="w-full">
            <EmptyState action={<Button purpose="create">Add one</Button>} title="No items yet">
              Add an item to get started.
            </EmptyState>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
