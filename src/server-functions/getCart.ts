'use server';

import { Cart } from '@/types/Cart';
import { readDatabase } from '@/app/(please-ignore)/api/db';
import { unstable_cache as nextCache } from 'next/cache';
import { wait } from '@/lib/wait';

export async function getCart({
  cartId,
}: {
  cartId: string;
}): Promise<Cart | undefined> {
  await wait(500);

  const cart = nextCache(
    async () => {
      const db = await readDatabase();
      const cart = db.carts[cartId];
      return cart;
    },
    [cartId],
    { tags: ['cart'], revalidate: 3600 },
  );

  return cart();
}
