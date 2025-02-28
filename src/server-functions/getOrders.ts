'use server';

import { API_BASE_URL } from '@/lib/constants';
import { z } from 'zod';
import { orderSchema } from '@/lib/schemas/order';
import { errorMessages } from '@/lib/constants';

export const getOrders = async (token: string) => {
  // TODO: Implement getting orders to display on the account page
  // TODO: Make this type-safe, possibly with zod
  const response = await fetch(API_BASE_URL + '/api/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 3600,
      tags: ['orders'],
    },
  });

  if (!response.ok) {
    throw new Error(errorMessages.order.getOrdersFailed + response.statusText);
  }

  const data = await response.json();
  const orders = z.array(orderSchema).safeParse(data);

  if (!orders.success) {
    throw new Error(errorMessages.order.validationFailed);
  }

  return orders.data;
};
