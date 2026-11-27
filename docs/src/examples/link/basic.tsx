import { Link } from '@ksojecki/ui/navigation';

export default function LinkBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link to="/settings">Settings</Link>
      <Link tone="secondary" to="/help">
        Help
      </Link>
      <Link asButton purpose="create" to="/items/new">
        New item
      </Link>
      <Link asButton tone="neutral" variant="outline" to="/items">
        All items
      </Link>
    </div>
  );
}
