import { Button } from '@ksojecki/ui/actions';

export default function ButtonFullWidth() {
  return (
    <div className="max-w-sm">
      <Button fullWidth purpose="save" type="submit">
        Save changes
      </Button>
    </div>
  );
}
