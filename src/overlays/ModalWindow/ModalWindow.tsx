import { useId, useLayoutEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { IconButton } from '../../actions/IconButton';
import { joinClassNames } from '../../internal/classNames';
import { TbX } from '../../icons';
import { Heading } from '../../typography/Heading';

export type DialogSize = 'sm' | 'md' | 'lg';

// Literal class names so Tailwind's scanner picks them up.
const DIALOG_SIZE_CLASS_NAMES: Record<DialogSize, string> = {
  sm: 'w-11/12 max-w-md',
  md: 'w-11/12 max-w-2xl',
  lg: 'w-11/12 max-w-5xl',
};

export type ModalWindowApi = {
  show: () => void;
  close: () => void;
};

export type ModalWindowProps = {
  api: RefObject<ModalWindowApi | null>;
  actions?: ReactNode;
  children: ReactNode;
  title: string;
  onClose?: () => void;
  closeLabel?: string;
  /** Dialog width. Default `lg`. */
  size?: DialogSize;
};

export type NativeDialogProps = {
  children: ReactNode;
  api?: RefObject<ModalWindowApi | null>;
  open?: boolean;
  saving?: boolean;
  onClose?: () => void;
  backdropLabel?: string;
  boxClassName?: string;
  labelledBy?: string;
  /** Dialog width. Omit to keep the daisyUI default width of `boxClassName`. */
  size?: DialogSize;
  /** Heading rendered at the top of the box. Labels the dialog unless `labelledBy` is set. */
  title?: ReactNode;
};

/**
 * Bare native `<dialog>` box. Control it with `open` or the `api` ref; while `saving` is true, Escape does not close it.
 *
 * @example
 * ```tsx
 * <NativeDialog backdropLabel="Close" onClose={close} open={isOpen} size="sm" title="Rename">
 *   <Input label="Name" />
 * </NativeDialog>
 * ```
 */
export const NativeDialog = ({
  children,
  api,
  open,
  saving = false,
  onClose,
  backdropLabel,
  boxClassName = 'modal-box',
  labelledBy,
  size,
  title,
}: NativeDialogProps) => {
  const modal = useRef<HTMLDialogElement | null>(null);
  const titleId = useId();
  useLayoutEffect(() => {
    if (api) {
      api.current = {
        show: () => showDialog(modal.current),
        close: () => closeDialog(modal.current),
      };
    }
  }, [api]);
  useLayoutEffect(() => {
    if (open === undefined) {
      return;
    }
    const dialog = modal.current;
    if (open && !dialog?.open) {
      showDialog(dialog);
    } else if (!open && dialog?.open) {
      closeDialog(dialog);
    }
  }, [open]);

  return (
    <dialog
      aria-labelledby={labelledBy ?? (title ? titleId : undefined)}
      className="modal"
      onCancel={(event) => {
        if (saving) {
          event.preventDefault();
        } else {
          event.currentTarget.close();
        }
      }}
      onClose={() => {
        if (open === undefined || (open && !saving)) {
          onClose?.();
        }
      }}
      ref={modal}
    >
      <div
        className={joinClassNames(
          boxClassName,
          size ? DIALOG_SIZE_CLASS_NAMES[size] : undefined,
          'animate-scale-in',
        )}
      >
        {/* NativeDialog and ModalWindow share this title markup, so both dialogs render the same heading. */}
        {title ? (
          <Heading id={titleId} level={3}>
            {title}
          </Heading>
        ) : null}
        {children}
      </div>
      {backdropLabel ? (
        <form className="modal-backdrop" method="dialog">
          <button aria-label={backdropLabel} disabled={saving} type="submit">
            {backdropLabel}
          </button>
        </form>
      ) : null}
    </dialog>
  );
};

/**
 * Modal dialog with a title, a close button and an actions row. Open and close it through the `api` ref.
 *
 * @example
 * ```tsx
 * const modal = useRef<ModalWindowApi | null>(null);
 *
 * <Button onClick={() => modal.current?.show()}>Edit</Button>
 * <ModalWindow
 *   actions={<Button purpose="save">Save</Button>}
 *   api={modal}
 *   closeLabel="Close"
 *   title="Edit item"
 * >
 *   <Paragraph>Edit the item details before saving.</Paragraph>
 * </ModalWindow>
 * ```
 */
export const ModalWindow = ({
  actions,
  api,
  children,
  title,
  onClose,
  closeLabel,
  size = 'lg',
}: ModalWindowProps) => (
  <NativeDialog api={api} onClose={onClose} size={size} title={title}>
    <div className="py-4">{children}</div>
    <form method="dialog" className="modal-action">
      <IconButton
        className="absolute right-4 top-4 rounded-full"
        icon={<TbX className="h-4 w-4" />}
        label={closeLabel ?? 'Close'}
        size="sm"
        type="submit"
      />
      {actions ?? null}
    </form>
  </NativeDialog>
);

function showDialog(dialog: HTMLDialogElement | null) {
  if (dialog === null) {
    return;
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    return;
  }

  dialog.setAttribute('open', '');
}

function closeDialog(dialog: HTMLDialogElement | null) {
  if (dialog === null) {
    return;
  }

  if (typeof dialog.close === 'function') {
    dialog.close();
    return;
  }

  dialog.removeAttribute('open');
}
