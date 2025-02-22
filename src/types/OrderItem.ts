import { z } from 'zod';
import { orderItemSchema } from '@/lib/schemas/orderItem';

export type OrderItem = z.infer<typeof orderItemSchema>;
