import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  imageSrc: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
});
