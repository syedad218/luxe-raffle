'use server';

import { API_BASE_URL } from '@/lib/constants';
import { z } from 'zod';
import { errorMessages } from '@/lib/constants';
import { wait } from '@/lib/wait';

const LoginResponse = z.object({
  token: z.string(),
});

const LoginRequest = z.object({
  email: z.string().email({ message: errorMessages.login.email }),
  password: z.string().min(8, { message: errorMessages.login.password }),
});

export const login = async (email: string, password: string) => {
  // TODO: Implement login and store token safely
  await wait(500);

  const validatedCredentials = LoginRequest.parse({ email, password });

  const response = await fetch(API_BASE_URL + '/api/auth/token', {
    method: 'POST',
    body: JSON.stringify(validatedCredentials),
  });

  if (!response.ok) {
    throw new Error(errorMessages.login.invalid);
  }

  const { token } = await response.json();
  const validatedToken = LoginResponse.parse({ token });

  return validatedToken;
};
