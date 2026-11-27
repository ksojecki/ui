import { Button } from '@ksojecki/ui/actions';
import { TbCalendar, TbDownload, TbPlus, TbSearch, TbSettings, TbTrash } from '@ksojecki/ui/icons';

export default function IconsExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 text-2xl">
        <TbPlus aria-hidden="true" />
        <TbTrash aria-hidden="true" />
        <TbSearch aria-hidden="true" />
        <TbCalendar aria-hidden="true" />
        <TbSettings aria-hidden="true" />
      </div>
      <Button purpose="neutral">
        <TbDownload aria-hidden="true" />
        Export
      </Button>
    </div>
  );
}
