'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Cart, CartItem } from '@/types/Cart';
import { Minus, Plus } from 'lucide-react';
import { updateItem } from './actions';
import type { Raffle } from '@/types/Raffle';

export default function EditQuantityButton({
  type,
  productId,
}: {
  type: 'plus' | 'minus';
  productId: Raffle['id'];
}) {
  const [message, formAction] = useActionState(updateItem, null);
  const payload = { productId, updateType: type };
  const updateItemAction = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        // optimisticUpdate(payload.merchandiseId, type);
        updateItemAction();
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
