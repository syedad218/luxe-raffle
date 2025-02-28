import { z } from 'zod';
import { orderItemSchema } from '@/lib/schemas/orderItem';

export const orderSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  total: z.number(),
  subtotal: z.number(),
  shipping: z.number().optional(),
  items: z.array(orderItemSchema),
});
