import { z } from 'zod';

export const cartItemSchema = z.object({
  raffleId: z.number(),
  quantity: z.number(),
  addedAt: z.string(),
  cost: z.number(),
  imageSrc: z.string(),
  name: z.string(),
  description: z.string(),
});

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(cartItemSchema),
  totalQuantity: z.number(),
  totalCost: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expiresAt: z.string(),
});
