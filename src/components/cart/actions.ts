'use server';

import type { Raffle } from '@/types/Raffle';
import {
  addToCart,
  removeFromCart,
  updateItemInCart,
  createCart,
} from '@/server-functions/cart';
import { cookies } from 'next/headers';

export async function addItem(prevState: any, product: Raffle) {
  if (!product) {
    return 'No product provided';
  }

  let cartId: any = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    cartId = await createCartAndSetCookie();
  }

  try {
    const cartCount = await addToCart({ product, quantity: 1, cartId });
    (await cookies()).set('cartCount', cartCount.toString());
  } catch (error: Error | any) {
    return `Error adding item to cart: ${error.message}`;
  }
}

export async function updateItem(
  prevState: any,
  payload: { productId: Raffle['id']; updateType: 'plus' | 'minus' },
) {
  const { productId, updateType } = payload;
  if (!productId) {
    return 'No product provided';
  }

  let cartId: any = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return 'No cart found';
  }

  try {
    console.log('updateItem', productId, updateType, cartId);
    const cartCount = await updateItemInCart({ productId, cartId, updateType });
    (await cookies()).set('cartCount', cartCount.toString());
  } catch (error: Error | any) {
    return `Error updating item in cart: ${error.message}`;
  }
}

export async function removeItem(prevState: any, productId: Raffle['id']) {
  if (!productId) {
    return 'No product provided';
  }

  let cartId: any = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return 'No cart found';
  }

  try {
    const cartCount = await removeFromCart({ productId, cartId });
    (await cookies()).set('cartCount', cartCount.toString());
  } catch (error: Error | any) {
    return `Error removing item from cart: ${error.message}`;
  }
}

export async function createCartAndSetCookie() {
  const cartId = await createCart();
  (await cookies()).set('cartId', cartId!, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  return cartId;
}
