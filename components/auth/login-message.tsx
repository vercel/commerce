import { TriangleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';

export function LoginMessage() {
  return (
    <Alert variant="destructive">
      <TriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  );
}
