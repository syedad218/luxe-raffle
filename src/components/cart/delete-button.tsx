'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { removeItem } from '@/actions/cart';
import type { Raffle } from '@/types/Raffle';
import { CartAction } from '@/types/Cart';
import { Spinner } from '../ui/spinner';

type state = {
  success: boolean;
  error: string;
};

const initialState: state = {
  success: false,
  error: '',
};

export default function DeleteButton({
  productId,
  setOptimisticCartItems,
}: {
  productId: Raffle['id'];
  setOptimisticCartItems: (action: CartAction) => void;
}) {
  const [state, formAction, isPending] = useActionState(
    removeItem,
    initialState,
  );
  const removeItemAction = formAction.bind(null, productId);

  useEffect(() => {
    const { error: message } = state || {};
    if (message) window.alert(message);
  }, [state]);

  return (
    <form
      action={async () => {
        setOptimisticCartItems({
          type: 'delete',
          payload: { raffleId: productId },
        });
        await removeItemAction();
      }}
    >
      <Button variant="destructive" size="icon" disabled={isPending}>
        {isPending ? (
          <Spinner size="sm" variant="default" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.error}
      </p>
    </form>
  );
}
