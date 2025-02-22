import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
});
