import { z } from 'zod';
import { userSchema } from '@/lib/schemas/user';

export type User = z.infer<typeof userSchema>;
