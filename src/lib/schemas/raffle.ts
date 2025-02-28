import { z } from 'zod';

export const raffleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  longDescription: z.string(),
  carPrice: z.number(),
  ticketPrice: z.number(),
  totalTickets: z.number(),
  availableTickets: z.number(),
});
