'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { updateItem } from '@/actions/cart';
import type { Raffle } from '@/types/Raffle';
import { CartAction } from '@/types/Cart';

type State = {
  success: boolean;
  error: string;
};

const initialState: State = {
  success: false,
  error: '',
};

export default function EditQuantityButton({
  type,
  productId,
  setOptimisticCartItems,
}: {
  type: 'plus' | 'minus';
  productId: Raffle['id'];
  setOptimisticCartItems: (action: CartAction) => void;
}) {
  const [state, formAction] = useActionState(updateItem, initialState);
  const payload = { productId, updateType: type };
  const updateItemAction = formAction.bind(null, payload);

  useEffect(() => {
    const { error: message } = state || {};
    if (message) window.alert(message);
  }, [state]);

  return (
    <form
      action={async () => {
        setOptimisticCartItems({
          type,
          payload: { raffleId: productId },
        });
        await updateItemAction();
      }}
    >
      <Button variant="outline" size="icon">
        {type === 'plus' ? (
          <Plus className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.error}
      </p>
    </form>
  );
}
