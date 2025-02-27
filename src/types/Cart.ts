import { z } from 'zod';
import { cartItemSchema, cartSchema } from '../lib/schemas/cart';

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof cartSchema>;

export type OptimisticCart = CartItem & { isPending?: boolean };

export type UpdateType = 'plus' | 'minus' | 'delete';

export type CartAction = {
  type: UpdateType;
  payload: { raffleId: number };
};
