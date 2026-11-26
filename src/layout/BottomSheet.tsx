import { useId, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '../actions/Button';
import { joinClassNames } from '../internal/classNames';

export interface BottomSheetProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  children: ReactNode;
  /** Uncontrolled initial state. Ignored when `open` is set. */
  defaultOpen?: boolean;
  className?: string;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Shown under the title, so a result stays visible while the sheet is collapsed. */
  summary?: ReactNode;
  title: ReactNode;
}

/**
 * Panel docked at the bottom of a flex column. The body stays mounted when collapsed,
 * so form state inside it is kept.
 */
export function BottomSheet({
  children,
  className,
  defaultOpen = true,
  onOpenChange,
  open,
  summary,
  title,
  ...rest
}: BottomSheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const bodyId = useId();
  const summaryId = useId();

  const toggle = () => {
    const next = !isOpen;
    if (open === undefined) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <section
      {...rest}
      className={joinClassNames(
        'flex min-h-0 shrink-0 animate-slide-up flex-col rounded-t-box border-t border-base-300 bg-base-100 shadow-lg',
        className,
      )}
    >
      <Button
        aria-controls={bodyId}
        aria-describedby={summary ? summaryId : undefined}
        aria-expanded={isOpen}
        className="h-auto w-full shrink-0 flex-col gap-2 rounded-none rounded-t-box py-3"
        fullWidth
        onClick={toggle}
        tone="default"
      >
        <span aria-hidden="true" className="h-1 w-10 rounded-full bg-base-300" />
        <span>{title}</span>
        {summary ? (
          <span className="w-full" id={summaryId}>
            {summary}
          </span>
        ) : null}
      </Button>
      <div className="min-h-0 overflow-y-auto overscroll-contain" hidden={!isOpen} id={bodyId}>
        {children}
      </div>
    </section>
  );
}
