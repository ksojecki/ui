import { PageContainer } from '@ksojecki/ui/layout';

export default function PageContainerBasic() {
  return (
    <div className="flex flex-col gap-2">
      {(['standard', 'wide', 'full'] as const).map((width) => (
        <PageContainer className="rounded-box bg-base-200 py-2 text-sm" key={width} width={width}>
          width=&quot;{width}&quot;
        </PageContainer>
      ))}
    </div>
  );
}
