'use server';

import type { Raffle } from '@/types/Raffle';
import {
  addToCart,
  removeFromCart,
  updateItemInCart,
  createCart,
} from '@/server-functions/cart';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { decryptToken } from '@/lib/token';

export async function addItem(prevState: unknown, product: Raffle) {
  if (!product) {
    return 'No product provided';
  }

  const cookieStore = await cookies();

  let cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    cartId = await createCartAndSetCookie();
  }

  try {
    const cartCount = await addToCart({ product, quantity: 1, cartId });
    cookieStore.set('cartCount', cartCount.toString());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `Error adding item to cart: ${errorMessage}`;
  }

  revalidateTag('cart');
}

export async function updateItem(
  prevState: unknown,
  payload: { productId: Raffle['id']; updateType: 'plus' | 'minus' },
) {
  const { productId, updateType } = payload;
  if (!productId) {
    return 'No product provided';
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    return 'No cart found';
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cartCount = await updateItemInCart({
      productId,
      cartId,
      updateType,
    });
    if (cartCount === 0) {
      cookieStore.delete('cartCount').delete('cartId');
    } else {
      cookieStore.set('cartCount', cartCount.toString());
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `Error updating item in cart: ${errorMessage}`;
  }

  revalidateTag('cart');
}

export async function removeItem(prevState: unknown, productId: Raffle['id']) {
  if (!productId) {
    return 'No product provided';
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value;

  if (!cartId) {
    return 'No cart found';
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cartCount = await removeFromCart({ productId, cartId });
    if (cartCount === 0) {
      cookieStore.delete('cartCount').delete('cartId');
    } else {
      cookieStore.set('cartCount', cartCount.toString());
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `Error removing item from cart: ${errorMessage}`;
  }

  revalidateTag('cart');
}

export async function createCartAndSetCookie() {
  const cartId = crypto.randomUUID();
  const cookiesStore = await cookies();
  const token = cookiesStore.get('sid')?.value;
  const userId = decryptToken(token || '')?.id;
  await createCart(cartId, userId);
  cookiesStore.set('cartId', cartId!, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  return cartId;
}
