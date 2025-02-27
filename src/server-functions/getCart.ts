'use server';

import { Cart } from '@/types/Cart';
import { readDatabase } from '@/app/(please-ignore)/api/db';
import { cookies } from 'next/headers';
import { unstable_cache as nextCache } from 'next/cache';

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return undefined;
  }

  const cart = nextCache(
    async () => {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

      const db = await readDatabase();
      const cart = db.carts[cartId];
      return cart;
    },
    [cartId],
    { tags: ['cart'], revalidate: 3600 },
  );

  return cart();
}
