'use server';

import { API_BASE_URL, errorMessages } from '@/lib/constants';
import { raffleSchema } from '@/lib/schemas/raffle';
import { Raffle } from '@/types/Raffle';
import { z } from 'zod';
import { readDatabase } from '@/app/(please-ignore)/api/db';
import { wait } from '@/lib/wait';

const RafflesResponseSchema = z.array(raffleSchema);

export const getRaffles = async (): Promise<Raffle[]> => {
  // TODO: Make this somehow type-safe, possibly with zod
  const response = await fetch(API_BASE_URL + '/api/raffles', {
    next: {
      revalidate: 3600,
      tags: ['raffles'],
    },
  });
  if (!response.ok) {
    throw new Error(
      errorMessages.raffles.getRafflesFailed + response.statusText,
    );
  }
  const data = await response.json();
  const validatedRaffles = RafflesResponseSchema.parse(data);

  return validatedRaffles;
};

export const getRaffle = async (id: number): Promise<Raffle> => {
  await wait(2000);

  const db = await readDatabase();
  const raffle = db.raffles.find((raffle) => raffle.id === id);

  if (!raffle) {
    throw new Error(`${errorMessages.raffles.getRaffleFailed} ${id}`);
  }

  return raffle;
};
