import { z } from 'zod';
import { cartReservationSchema } from '@/lib/schemas/cartReservations';

export type CartReservation = z.infer<typeof cartReservationSchema>;
