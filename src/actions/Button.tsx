import { createContext, useContext, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ACTION_PURPOSES, type ActionPurpose } from '../internal/purpose';
import { Spinner } from '../feedback/Spinner';
import { joinClassNames } from '../internal/classNames';

export type ButtonTone =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type ButtonVariant = 'solid' | 'soft' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  /** Semantic action meaning. Apps should prefer `purpose` over `tone`. */
  purpose?: ActionPurpose;
  size?: ButtonSize;
  /** Square icon-only button. */
  square?: boolean;
  /** Explicit override of the purpose tone. */
  tone?: ButtonTone;
  /** Explicit override of the purpose variant. */
  variant?: ButtonVariant;
}

export interface ButtonClassOptions {
  className?: string;
  fullWidth?: boolean;
  purpose?: ActionPurpose;
  size?: ButtonSize;
  square?: boolean;
  tone?: ButtonTone;
  variant?: ButtonVariant;
}

const BUTTON_BASE_CLASS_NAME = 'btn';

const BUTTON_VARIANT_CLASS_NAMES: Record<ButtonVariant, string | undefined> = {
  solid: undefined,
  soft: 'btn-soft',
  outline: 'btn-outline',
};

const BUTTON_TONE_CLASS_NAMES: Record<ButtonTone, string> = {
  default: 'btn-default',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  neutral: 'btn-neutral',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

// Literal class names so Tailwind's scanner picks them up.
const BUTTON_SIZE_CLASS_NAMES: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

const ButtonSizeContext = createContext<ButtonSize | undefined>(undefined);

/** Default size for the buttons and links rendered inside it. An explicit `size` prop still wins. */
export function ButtonSizeProvider({ size, children }: { size: ButtonSize; children: ReactNode }) {
  return <ButtonSizeContext.Provider value={size}>{children}</ButtonSizeContext.Provider>;
}

/** Explicit size, else the nearest `ButtonSizeProvider`, else `md`. */
export function useButtonSize(size?: ButtonSize): ButtonSize {
  const contextSize = useContext(ButtonSizeContext);
  return size ?? contextSize ?? 'md';
}

/** Explicit `tone`/`variant` win, then `purpose`, then primary/solid. */
export function resolveButtonStyle({
  purpose,
  tone,
  variant,
}: Pick<ButtonClassOptions, 'purpose' | 'tone' | 'variant'>) {
  const purposeStyle = purpose ? ACTION_PURPOSES[purpose] : undefined;

  return {
    tone: tone ?? purposeStyle?.tone ?? 'primary',
    variant: variant ?? purposeStyle?.variant ?? 'solid',
  };
}

/** Class string for any button-styled element. Shared by `Button` and `Link` with `asButton`. */
export function buttonClassName({
  className,
  fullWidth = false,
  purpose,
  size = 'md',
  square = false,
  tone,
  variant,
}: ButtonClassOptions): string {
  const style = resolveButtonStyle({ purpose, tone, variant });

  return joinClassNames(
    BUTTON_BASE_CLASS_NAME,
    BUTTON_TONE_CLASS_NAMES[style.tone],
    BUTTON_VARIANT_CLASS_NAMES[style.variant],
    BUTTON_SIZE_CLASS_NAMES[size],
    square ? 'btn-square' : undefined,
    fullWidth ? 'w-full' : undefined,
    className,
  );
}

/**
 * Reusable button component for shared UI actions across applications.
 * Resolution: explicit `tone`/`variant` win, then `purpose`, then primary/solid.
 */
export const Button = ({
  children,
  className,
  disabled,
  fullWidth = false,
  isLoading = false,
  purpose,
  size: sizeProp,
  square,
  tone,
  variant,
  ...props
}: ButtonProps) => {
  const size = useButtonSize(sizeProp);

  return (
    <button
      className={buttonClassName({ className, fullWidth, purpose, size, square, tone, variant })}
      aria-busy={isLoading || undefined}
      disabled={disabled || isLoading}
      type="button"
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
};
