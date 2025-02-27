'use server';

import { API_BASE_URL } from '@/lib/constants';
import { OrderItem } from '@/types/OrderItem';

export const order = async ({
  // items
  items,
  token,
}: {
  items: OrderItem[];
  token: string;
}) => {
  // TODO: Implement placing order for customer

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(API_BASE_URL + '/api/orders', {
    method: 'POST',
    body: JSON.stringify({ items }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  const data = await response.json();

  return data;
};
