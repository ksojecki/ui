import { Divider } from '@ksojecki/ui/layout';

export default function DividerBasic() {
  return (
    <div className="flex flex-col gap-4">
      <Divider />
      <Divider>or</Divider>
      <div className="flex h-12 items-center">
        <span>Left</span>
        <Divider vertical />
        <span>Right</span>
      </div>
    </div>
  );
}
