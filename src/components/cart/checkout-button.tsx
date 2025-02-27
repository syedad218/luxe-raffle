'use client';

import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { Cart } from '@/types/Cart';
import { checkoutAction } from '@/actions/checkout';

export default function CheckoutButton({ cart }: { cart: Cart | undefined }) {
  if (!cart) {
    return null;
  }

  const { id: cartId, userId, items } = cart;

  const orderItems = items.map((item) => ({
    id: item.raffleId,
    quantity: item.quantity,
    imageSrc: item.imageSrc,
    name: item.name,
    description: item.description,
    price: item.cost,
  }));

  const [message, formAction, isPending] = useActionState(checkoutAction, null);
  const orderAction = formAction.bind(null, {
    cartId,
    userId,
    items: orderItems,
  });

  return (
    <form action={orderAction}>
      <Button
        variant="default"
        className="w-full bg-black hover:bg-gray-800 text-white py-3"
      >
        {isPending ? <Spinner size="sm" variant="default" /> : 'Go to checkout'}
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
