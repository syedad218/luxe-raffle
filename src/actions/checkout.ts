'use server';

import { OrderItem } from '@/types/OrderItem';
import { order } from '@/server-functions/order';
import { deleteCart } from '@/server-functions/cart';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const checkoutAction = async (
  prevState: unknown,
  payload: { cartId: string; userId: number | undefined; items: OrderItem[] },
) => {
  // TODO: Implement this. Redirect to /account
  const { cartId, userId, items } = payload;
  const cookieStore = await cookies();
  const token = cookieStore.get('sid')?.value;

  if (!token) {
    return {
      message: 'Please login to place an order! Do you want to login?',
      redirect: '/login?redirect=/cart',
    };
  }

  try {
    await order({ items, token });
    // delete cart for the user on successful order
    await deleteCart(cartId, userId);
    cookieStore.delete('cartCount').delete('cartId');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      message: `Something went wrong! ${errorMessage}`,
    };
  }

  revalidateTag('orders');
  revalidateTag('cart');

  redirect('/account');
};
