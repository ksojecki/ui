import { IconButton, type IconButtonProps } from './IconButton';
import { TbPencil, TbPlus, TbTrash } from '../icons';
import type { ButtonTone } from './Button';

type IconActionButtonProps = Omit<IconButtonProps, 'icon' | 'tone' | 'variant'> & {
  tone?: ButtonTone;
  variant?: IconButtonProps['variant'];
};

/**
 * Icon button with a pencil, for editing an item. Neutral and soft by default.
 *
 * @example
 * ```tsx
 * <EditButton label="Edit invoice" onClick={() => edit(invoice.id)} />
 * ```
 */
export function EditButton({
  tone = 'neutral',
  variant = tone === 'ghost' ? 'solid' : 'soft',
  ...props
}: IconActionButtonProps) {
  return <IconButton {...props} icon={<TbPencil />} tone={tone} variant={variant} />;
}

/**
 * Icon button with a trash can, for deleting an item. Error and soft by default.
 *
 * @example
 * ```tsx
 * <DeleteButton label="Delete invoice" onClick={() => remove(invoice.id)} />
 * ```
 */
export function DeleteButton({
  tone = 'error',
  variant = tone === 'ghost' ? 'solid' : 'soft',
  ...props
}: IconActionButtonProps) {
  return <IconButton {...props} icon={<TbTrash />} tone={tone} variant={variant} />;
}

/**
 * Icon button with a plus, for creating an item. Primary and soft by default.
 *
 * @example
 * ```tsx
 * <NewButton label="New invoice" onClick={create} />
 * ```
 */
export function NewButton({
  tone = 'primary',
  variant = tone === 'ghost' ? 'solid' : 'soft',
  ...props
}: IconActionButtonProps) {
  return <IconButton {...props} icon={<TbPlus />} tone={tone} variant={variant} />;
}
