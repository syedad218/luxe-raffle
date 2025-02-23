'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { removeItem } from './actions';
import type { Raffle } from '@/types/Raffle';

export default function DeleteButton({
  productId,
}: {
  productId: Raffle['id'];
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const removeItemAction = formAction.bind(null, productId);

  return (
    <form
      action={async () => {
        // optimisticUpdate(payload.merchandiseId, type);
        removeItemAction();
      }}
    >
      <Button variant="destructive" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
