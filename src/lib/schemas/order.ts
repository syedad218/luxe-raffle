import { z } from 'zod';
import { orderItemSchema } from '@/lib/schemas/orderItem';

export const orderSchema = z.object({
  id: z.string(),
  items: z.array(orderItemSchema),
});
