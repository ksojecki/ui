import { useId } from 'react';
import type { To } from 'react-router';
import { Button } from '../../actions/Button';
import { Link } from '../../navigation/Link';
import { Heading } from '../../typography/Heading';
import { Paragraph } from '../../typography/Paragraph';

export interface ConsentBannerProps {
  title: string;
  body: string;
  policyLink: { label: string; to: To };
  settingsLabel: string;
  rejectLabel: string;
  acceptLabel: string;
  onSettings: () => void;
  onReject: () => void;
  onAccept: () => void;
}

// Reject and accept share one style on purpose: neither choice is pre-selected or emphasised.
const CHOICE_BUTTON_PROPS = {
  size: 'md',
  tone: 'neutral',
  variant: 'outline',
} as const;

/**
 * Non-modal consent prompt pinned to the bottom of the viewport. The page stays usable behind it.
 * z-[1200] sits above toasts (z-[1100]) and typical map-library overlays (z-[1000]).
 */
export function ConsentBanner({
  title,
  body,
  policyLink,
  settingsLabel,
  rejectLabel,
  acceptLabel,
  onSettings,
  onReject,
  onAccept,
}: ConsentBannerProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[1200] border-t border-base-300 bg-base-100 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <Heading id={titleId} level={2} size={4}>
            {title}
          </Heading>
          <Paragraph className="text-sm" tone="muted">
            {body}{' '}
            <Link className="text-sm" to={policyLink.to}>
              {policyLink.label}
            </Link>
          </Paragraph>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:shrink-0 md:flex-nowrap">
          <Button onClick={onSettings} size="md" tone="ghost">
            {settingsLabel}
          </Button>
          <Button {...CHOICE_BUTTON_PROPS} onClick={onReject}>
            {rejectLabel}
          </Button>
          <Button {...CHOICE_BUTTON_PROPS} onClick={onAccept}>
            {acceptLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
