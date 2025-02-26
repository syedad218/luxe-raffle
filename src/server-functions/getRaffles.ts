'use server';

import { API_BASE_URL } from '@/lib/constants';
import { raffleSchema } from '@/lib/schemas/raffle';
import { Raffle } from '@/types/Raffle';
import { z } from 'zod';

const RafflesResponseSchema = z.array(raffleSchema);

export const getRaffles = async (): Promise<Raffle[]> => {
  // TODO: Make this somehow type-safe, possibly with zod
  const response = await fetch(API_BASE_URL + '/api/raffles', {
    next: {
      revalidate: false,
      tags: ['raffles'],
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch raffles! ' + response.statusText);
  }
  const data = await response.json();
  const validatedRaffles = RafflesResponseSchema.parse(data);

  return validatedRaffles;
};
