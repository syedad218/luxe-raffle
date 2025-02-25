'use client';

import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

export default function CheckoutButton({
  checkoutAction,
  orderItems,
}: {
  checkoutAction: any;
  orderItems: any;
}) {
  const [message, formAction, isPending] = useActionState(checkoutAction, null);
  const orderAction = formAction.bind(null, orderItems);

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
