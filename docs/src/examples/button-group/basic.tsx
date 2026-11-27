import { Button, ButtonGroup } from '@ksojecki/ui/actions';

export default function ButtonGroupBasic() {
  return (
    <ButtonGroup label="Date range">
      <Button tone="neutral">Day</Button>
      <Button tone="neutral">Week</Button>
      <Button tone="neutral">Month</Button>
    </ButtonGroup>
  );
}
