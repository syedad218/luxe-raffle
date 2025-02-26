'use server';

import { API_BASE_URL } from '@/lib/constants';
import { z } from 'zod';
import { orderSchema } from '@/lib/schemas/order';

export const getOrders = async (token: string) => {
  // TODO: Implement getting orders to display on the account page
  // TODO: Make this type-safe, possibly with zod
  const response = await fetch(API_BASE_URL + '/api/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: false,
      tags: ['orders'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders! ' + response.statusText);
  }

  const data = await response.json();
  const orders = z.array(orderSchema).parse(data);

  return orders;
};
