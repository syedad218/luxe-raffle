'use server';

import { Cart } from '@/types/Cart';
import { readDatabase } from '@/app/(please-ignore)/api/db';
import { cookies } from 'next/headers';

export async function getCart(): Promise<Cart | undefined> {
  await new Promise((resolve) => {
    const delay = Math.random() * 3000 + 500;
    console.log('delay', delay);
    setTimeout(resolve, delay);
  });

  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) {
    return undefined;
  }
  const db = await readDatabase();
  const cart = db.carts[cartId];
  return cart;
}
