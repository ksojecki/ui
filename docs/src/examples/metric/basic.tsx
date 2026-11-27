import { Metric, MetricGroup } from '@ksojecki/ui/data';

export default function MetricBasic() {
  return (
    <div className="flex flex-col gap-4">
      <MetricGroup responsive>
        <Metric description="This month" label="Spent" value="2 140 zł" />
        <Metric description="12% under plan" label="Left" tone="success" value="860 zł" />
      </MetricGroup>
      <div className="grid gap-3 sm:grid-cols-2">
        <Metric appearance="boxed" label="Open orders" value="7" />
        <Metric appearance="boxed" label="Overdue" tone="error" value="2" />
      </div>
    </div>
  );
}
