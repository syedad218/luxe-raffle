'use client';

import { useActionState } from 'react';
import { Button } from '../ui/button';
import type { Raffle } from '@/types/Raffle';
import { addItem } from '@/actions/cart';
import { Spinner } from '../ui/spinner';

const AddToCart = ({ product }: { product: Raffle }) => {
  const [message, formAction, isPending] = useActionState(addItem, null);
  const addToCartAction = formAction.bind(null, product);

  return (
    <form action={addToCartAction} className="w-1/3">
      <>
        <Button variant="outline" disabled={isPending} className="w-full">
          {isPending ? <Spinner size="sm" variant="default" /> : 'Add to Cart'}
        </Button>
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </>
    </form>
  );
};

export default AddToCart;
