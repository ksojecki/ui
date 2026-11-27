import { IconButton } from '@ksojecki/ui/actions';
import { Tooltip } from '@ksojecki/ui/feedback';
import { TbInfoCircle } from '@ksojecki/ui/icons';

export default function TooltipBasic() {
  return (
    <div className="flex flex-wrap gap-6 py-6">
      <Tooltip text="Shown on hover and focus">
        <IconButton icon={<TbInfoCircle />} label="Details" />
      </Tooltip>
      <Tooltip position="right" text="On the right">
        <IconButton icon={<TbInfoCircle />} label="More details" />
      </Tooltip>
    </div>
  );
}
