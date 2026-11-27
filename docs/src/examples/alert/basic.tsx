import { Alert } from '@ksojecki/ui/feedback';

export default function AlertBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Alert purpose="info">Your changes are saved automatically.</Alert>
      <Alert purpose="success">Item created.</Alert>
      <Alert purpose="warning">Your plan ends in three days.</Alert>
      <Alert purpose="error">Could not load the list. Try again.</Alert>
    </div>
  );
}
