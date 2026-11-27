import { useState } from 'react';
import { Range } from '@ksojecki/ui/forms';

export default function RangeBasic() {
  const [volume, setVolume] = useState(40);
  const [balance, setBalance] = useState(50);

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Range label="Volume" max={100} min={0} onChange={setVolume} value={volume} />
      <Range
        label="Balance"
        max={100}
        min={0}
        onChange={setBalance}
        purpose="warning"
        size="sm"
        step={10}
        value={balance}
      />
      <p className="text-sm">
        Volume {volume}, balance {balance}
      </p>
    </div>
  );
}
