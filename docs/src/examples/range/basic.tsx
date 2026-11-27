import { useState } from 'react';
import { Range } from '@ksojecki/ui/forms';

export default function RangeBasic() {
  const [volume, setVolume] = useState(40);

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Range label="Volume" max={100} min={0} onChange={setVolume} value={volume} />
      <Range
        label="Volume (warning)"
        max={100}
        min={0}
        onChange={setVolume}
        purpose="warning"
        size="sm"
        step={10}
        value={volume}
      />
      <p className="text-sm">Value: {volume}</p>
    </div>
  );
}
