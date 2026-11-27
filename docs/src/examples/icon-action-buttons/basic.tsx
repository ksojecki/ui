import { DeleteButton, EditButton, NewButton } from '@ksojecki/ui/actions';

export default function IconActionButtonsBasic() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <NewButton label="New item" />
      <EditButton label="Edit item" />
      <DeleteButton label="Delete item" />
      <EditButton label="Edit item (ghost)" tone="ghost" />
    </div>
  );
}
