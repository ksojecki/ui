import { Button } from '@ksojecki/ui/actions';
import { TbPlus } from '@ksojecki/ui/icons';

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button purpose="create">
        <TbPlus aria-hidden="true" />
        With icon
      </Button>
      <Button disabled>Disabled</Button>
      <Button isLoading purpose="save">
        Saving
      </Button>
    </div>
  );
}
