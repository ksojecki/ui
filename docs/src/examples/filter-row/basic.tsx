import { FilterRow, Input, Select } from '@ksojecki/ui/forms';

export default function FilterRowBasic() {
  return (
    <FilterRow onRemove={() => undefined} removeLabel="Remove filter">
      <Select aria-label="Field" fullWidth={false}>
        <option>Quantity</option>
        <option>Price</option>
      </Select>
      <Input aria-label="Value" fullWidth={false} placeholder="Value" />
    </FilterRow>
  );
}
