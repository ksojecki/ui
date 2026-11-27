import { IconButton } from '@ksojecki/ui/actions';
import { TbSearch } from '@ksojecki/ui/icons';

export default function IconButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IconButton icon={<TbSearch />} label="Search (extra small)" size="xs" />
      <IconButton icon={<TbSearch />} label="Search (small)" size="sm" />
      <IconButton icon={<TbSearch />} label="Search (medium)" size="md" />
    </div>
  );
}
