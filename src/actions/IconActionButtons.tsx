import { IconButton, type IconButtonProps } from './IconButton';
import { TbPencil, TbPlus, TbTrash } from '../icons';
import type { ButtonTone } from './Button';

type IconActionButtonProps = Omit<IconButtonProps, 'icon' | 'tone' | 'variant'> & {
  tone?: ButtonTone;
  variant?: IconButtonProps['variant'];
};

export function EditButton({
  tone = 'neutral',
  variant = tone === 'ghost' ? 'solid' : 'soft',
  ...props
}: IconActionButtonProps) {
  return <IconButton {...props} icon={<TbPencil />} tone={tone} variant={variant} />;
}

export function DeleteButton({
  tone = 'error',
  variant = tone === 'ghost' ? 'solid' : 'soft',
  ...props
}: IconActionButtonProps) {
  return <IconButton {...props} icon={<TbTrash />} tone={tone} variant={variant} />;
}

export function NewButton({
  tone = 'primary',
  variant = tone === 'ghost' ? 'solid' : 'soft',
  ...props
}: IconActionButtonProps) {
  return <IconButton {...props} icon={<TbPlus />} tone={tone} variant={variant} />;
}
