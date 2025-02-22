import { z } from 'zod';
import { raffleSchema } from '@/lib/schemas/raffle';

export type Raffle = z.infer<typeof raffleSchema>;
