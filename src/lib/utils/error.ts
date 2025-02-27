import { z } from 'zod';

export const getZodErrorObject = (error: z.ZodError) => {
  return error.errors.reduce((acc: Record<string, string>, error) => {
    acc[error.path[0]] = error.message;
    return acc;
  }, {});
};
