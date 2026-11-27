import { Button } from '@ksojecki/ui/actions';
import { Alert, Badge } from '@ksojecki/ui/feedback';

export default function PurposesExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button purpose="save">save</Button>
        <Button purpose="confirm">confirm</Button>
        <Button purpose="create">create</Button>
        <Button purpose="edit">edit</Button>
        <Button purpose="delete">delete</Button>
        <Button purpose="cancel">cancel</Button>
        <Button purpose="neutral">neutral</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge purpose="info">info</Badge>
        <Badge purpose="success">success</Badge>
        <Badge purpose="warning">warning</Badge>
        <Badge purpose="error">error</Badge>
        <Badge purpose="neutral">neutral</Badge>
      </div>
      <Alert purpose="warning">Status purposes colour alerts, badges, toasts and metrics.</Alert>
    </div>
  );
}
