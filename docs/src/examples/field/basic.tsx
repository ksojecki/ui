import { Field, Input } from '@ksojecki/ui/forms';

export default function FieldBasic() {
  return (
    <div className="max-w-sm">
      <Field controlId="sku" hint="Printed on the label." label="Product code">
        <Input aria-describedby="sku-hint" id="sku" placeholder="AB-1234" />
      </Field>
    </div>
  );
}
