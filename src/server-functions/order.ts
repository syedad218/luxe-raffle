'use server';

import { API_BASE_URL } from '@/lib/constants';
import { OrderItem } from '@/types/OrderItem';
import { cookies } from 'next/headers';

export const order = async ({
  // items
  items,
}: {
  items: OrderItem[];
}) => {
  // TODO: Implement placing order for customer
  const token = (await cookies()).get('sid')?.value;

  if (!token) {
    throw new Error('Please log in to place an order!');
  }

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

  console.log('order successfully placed', data);
  return data;
};
