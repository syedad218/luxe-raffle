'use server';

import { API_BASE_URL } from '@/lib/constants';

export const getOrders = async (token: string) => {
  // TODO: Implement getting orders to display on the account page
  // TODO: Make this type-safe, possibly with zod
  try {
    const response = await fetch(API_BASE_URL + '/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders! ' + response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
    return { items: [] };
  }
};
