'use server';

import { OrderItem } from '@/types/OrderItem';
import { order } from '@/server-functions/order';
import { deleteCart } from '@/server-functions/cart';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const checkoutAction = async (
  prevState: any,
  payload: { cartId: string; userId: string; items: OrderItem[] },
) => {
  // TODO: Implement this. Redirect to /account
  const { cartId, userId, items } = payload;

  if (!userId) {
    redirect('/login?redirect=/cart');
  }

  try {
    await order({ items });
    // delete cart for the user on successful order
    await deleteCart(cartId, userId);
    (await cookies()).delete('cartCount');
  } catch (e) {
    console.error(e);
    return 'Failed to place order!';
  }

  revalidateTag('orders');

  redirect('/account');
};
