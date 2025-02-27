'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { updateItem } from '@/actions/cart';
import type { Raffle } from '@/types/Raffle';
import { CartAction } from '@/types/Cart';

export default function EditQuantityButton({
  type,
  productId,
  setOptimisticCartItems,
}: {
  type: 'plus' | 'minus';
  productId: Raffle['id'];
  setOptimisticCartItems: (action: CartAction) => void;
}) {
  const [message, formAction] = useActionState(updateItem, null);
  const payload = { productId, updateType: type };
  const updateItemAction = formAction.bind(null, payload);

  useEffect(() => {
    if (message) window.alert(message);
  }, [message]);

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
        {message}
      </p>
    </form>
  );
}
