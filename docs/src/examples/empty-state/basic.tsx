import { Button } from '@ksojecki/ui/actions';
import { EmptyState } from '@ksojecki/ui/feedback';

export default function EmptyStateBasic() {
  return (
    <EmptyState action={<Button purpose="create">Add item</Button>} title="No items yet">
      Items you add appear here.
    </EmptyState>
  );
}
