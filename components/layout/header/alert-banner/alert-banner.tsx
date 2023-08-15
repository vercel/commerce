import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertBanner() {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  );
}
