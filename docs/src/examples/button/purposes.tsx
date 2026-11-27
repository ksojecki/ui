import { Button } from '@ksojecki/ui/actions';

export default function ButtonPurposes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button purpose="save">Save</Button>
      <Button purpose="create">Create</Button>
      <Button purpose="edit">Edit</Button>
      <Button purpose="delete">Delete</Button>
      <Button purpose="cancel">Cancel</Button>
    </div>
  );
}
