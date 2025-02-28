'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import type { Raffle } from '@/types/Raffle';
import { addItem } from '@/actions/cart';
import { Spinner } from '../ui/spinner';

type State = {
  success: boolean;
  error: string;
};

const initialState: State = {
  success: false,
  error: '',
};

const AddToCart = ({ product }: { product: Raffle }) => {
  const [state, formAction, isPending] = useActionState(addItem, initialState);
  const addToCartAction = formAction.bind(null, product);

  useEffect(() => {
    const { success, error } = state || {};
    if (!success && error) {
      window.alert(error);
    }
  }, [state]);

  return (
    <form action={addToCartAction} className="w-1/3">
      <>
        <Button variant="outline" disabled={isPending} className="w-full">
          {isPending ? <Spinner size="sm" variant="default" /> : 'Add to Cart'}
        </Button>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.error}
        </p>
      </>
    </form>
  );
};

export default AddToCart;
