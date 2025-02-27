'use server';

import type { Raffle } from '@/types/Raffle';
import { addToCart, updateItemInCart } from '@/server-functions/cart';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { getCartExpiration } from '@/lib/utils/cart';
import { decryptToken } from '@/lib/token';
import { errorMessages } from '@/lib/constants';

export async function addItem(prevState: unknown, product: Raffle) {
  if (!product) {
    return {
      success: false,
      error: errorMessages.cart.emptyProduct,
    };
  }

  try {
    const cookieStore = await cookies();
    const existingCartId = cookieStore.get('cartId')?.value;
    const token = cookieStore.get('sid')?.value;
    const userId = decryptToken(token || '')?.id;

    const { cartCount, cartId } = await addToCart({
      product,
      quantity: 1,
      cartId: existingCartId,
      userId,
    });

    // If a new cart was created, set the cartId cookie or the previous cartId didn't exist in database
    if (cartId && cartId !== existingCartId) {
      cookieStore.set('cartId', cartId, { expires: getCartExpiration() });
    }

    cookieStore.set('cartCount', cartCount.toString());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Error adding item to cart: ${errorMessage}`,
    };
  }

  revalidateTag('cart');
}

export async function updateItem(
  prevState: unknown,
  payload: { productId: Raffle['id']; updateType: 'plus' | 'minus' },
) {
  const { productId, updateType } = payload;
  if (!productId) {
    return { success: false, error: errorMessages.cart.emptyProduct };
  }

  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value as string;
    const token = cookieStore.get('sid')?.value;
    const userId = decryptToken(token || '')?.id;

    const cartCount = await updateItemInCart({
      productId,
      cartId,
      updateType,
      userId,
    });
    if (cartCount === 0) {
      cookieStore.delete('cartCount').delete('cartId');
    } else {
      cookieStore.set('cartCount', cartCount.toString());
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Error updating item in cart: ${errorMessage}`,
    };
  }

  revalidateTag('cart');
}

export async function removeItem(prevState: unknown, productId: Raffle['id']) {
  if (!productId) {
    return { success: false, error: errorMessages.cart.emptyProduct };
  }

  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value as string;
  const token = cookieStore.get('sid')?.value;
  const userId = decryptToken(token || '')?.id;

  try {
    const cartCount = await updateItemInCart({
      productId,
      cartId,
      updateType: 'delete',
      userId,
    });
    if (cartCount === 0) {
      cookieStore.delete('cartCount').delete('cartId');
    } else {
      cookieStore.set('cartCount', cartCount.toString());
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Error removing item from cart: ${errorMessage}`,
    };
  }

  revalidateTag('cart');
}
