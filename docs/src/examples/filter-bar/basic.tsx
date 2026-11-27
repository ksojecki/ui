import { Button } from '@ksojecki/ui/actions';
import { FilterBar, Input, Select } from '@ksojecki/ui/forms';

export default function FilterBarBasic() {
  return (
    <FilterBar actions={<Button purpose="save">Apply</Button>}>
      <Input aria-label="Search" fullWidth={false} placeholder="Search" />
      <Select aria-label="Category" fullWidth={false}>
        <option>All categories</option>
        <option>Lighting</option>
      </Select>
    </FilterBar>
  );
}
