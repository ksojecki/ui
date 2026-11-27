import { Button, ButtonSizeProvider } from '@ksojecki/ui/actions';

export default function ButtonSizeProviderExample() {
  return (
    <ButtonSizeProvider size="sm">
      <div className="flex flex-wrap gap-2">
        <Button purpose="save">Small by default</Button>
        <Button size="lg">Explicit size wins</Button>
      </div>
    </ButtonSizeProvider>
  );
}
