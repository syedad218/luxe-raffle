import { z } from 'zod';

export const cartReservationSchema = z.object({
  id: z.string(),
  cartId: z.string(),
  productId: z.number(),
  createdAt: z.string(),
  expiresAt: z.string(),
  status: z.enum(['active', 'expired', 'completed']),
  quantity: z.number(),
});
