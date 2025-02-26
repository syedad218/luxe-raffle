'use server';

import { Cart } from '@/types/Cart';
import { readDatabase } from '@/app/(please-ignore)/api/db';
import { cookies } from 'next/headers';
import { unstable_cache as cache } from 'next/cache';

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return undefined;
  }

  const cart = cache(
    async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 3000 + 500),
      );

      const db = await readDatabase();
      const cart = db.carts[cartId];
      return cart;
    },
    [cartId],
    { tags: ['cart'], revalidate: false },
  );

  return cart();
}
