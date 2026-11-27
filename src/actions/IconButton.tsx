import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonTone, type ButtonVariant } from './Button';
import type { ActionPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type IconButtonSize = Extract<ButtonSize, 'xs' | 'sm' | 'md'>;

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  purpose?: ActionPurpose;
  size?: IconButtonSize;
  tone?: ButtonTone;
  variant?: ButtonVariant;
}

/**
 * Square icon-only button. `label` is its accessible name and tooltip. Without `purpose` or `tone` it is a ghost button.
 *
 * @example
 * ```tsx
 * <IconButton icon={<TbSearch />} label="Search" onClick={openSearch} />
 * ```
 */
export function IconButton({
  icon,
  label,
  purpose,
  size,
  tone,
  variant,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      aria-label={label}
      className={joinClassNames('btn-square', className)}
      purpose={purpose}
      size={size}
      title={label}
      // Without a purpose or explicit tone, icon-only buttons default to ghost.
      tone={tone ?? (purpose ? undefined : 'ghost')}
      variant={variant}
    >
      {icon}
    </Button>
  );
}
