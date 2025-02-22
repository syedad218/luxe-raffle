'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/error';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage error={error} reset={() => location.reload()} />;
}
