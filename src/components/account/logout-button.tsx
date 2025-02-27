'use client';

import { useActionState } from 'react';
import { handleLogout } from '@/actions/account';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '../ui/spinner';

export default function Logout() {
  const [message, formAction, isPending] = useActionState(handleLogout, null);

  return (
    <form action={formAction}>
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        className="!w-24"
      >
        {isPending ? (
          <Spinner size="sm" variant="default" />
        ) : (
          <>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </>
        )}
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
