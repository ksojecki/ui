import { Select } from '@ksojecki/ui/forms';

export default function SelectBasic() {
  return (
    <div className="flex max-w-sm flex-col gap-3">
      <Select hint="Used for grouping in reports." label="Category">
        <option>Lighting</option>
        <option>Stationery</option>
      </Select>
      <Select error="Pick a category." label="Category">
        <option>Choose</option>
      </Select>
    </div>
  );
}
