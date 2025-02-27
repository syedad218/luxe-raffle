'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { Cart } from '@/types/Cart';
import { checkoutAction } from '@/actions/checkout';
import { useRouter } from 'next/navigation';
import { generateOrderItemsFromCart } from '@/utils/orders';

type State = {
  message: string;
  redirect?: string;
};

const initialState: State = {
  message: '',
  redirect: '',
};

export default function CheckoutButton({ cart }: { cart: Cart | undefined }) {
  const { userId, items } = cart as Cart;
  const cartId = cart?.id as string;
  const router = useRouter();
  const orderItems = generateOrderItemsFromCart(items);

  const [state, formAction, isPending] = useActionState(
    checkoutAction,
    initialState,
  );
  const payload = { cartId, userId, items: orderItems };
  const orderAction = formAction.bind(null, payload);

  useEffect(() => {
    const { message, redirect } = state;
    if (redirect) {
      const confirmation = window.confirm(message);
      if (confirmation) {
        router.push(redirect);
      }
    } else if (message) {
      window.alert(message);
    }
  }, [state, router]);

  if (!cart) {
    return null;
  }

  return (
    <form action={orderAction}>
      <Button
        variant="default"
        className="w-full bg-black hover:bg-gray-800 text-white py-3"
      >
        {isPending ? <Spinner size="sm" variant="default" /> : 'Go to checkout'}
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state.message}
      </p>
    </form>
  );
}
