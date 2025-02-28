import { z } from 'zod';
import { orderSchema } from '@/lib/schemas/order';

export type Order = z.infer<typeof orderSchema>;
