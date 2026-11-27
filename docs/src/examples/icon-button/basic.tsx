import { IconButton } from '@ksojecki/ui/actions';
import { TbPlus, TbSearch, TbTrash } from '@ksojecki/ui/icons';

export default function IconButtonBasic() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IconButton icon={<TbSearch />} label="Search" />
      <IconButton icon={<TbPlus />} label="Add item" purpose="create" />
      <IconButton icon={<TbTrash />} label="Delete item" purpose="delete" />
    </div>
  );
}
