'use server';

import { API_BASE_URL } from '@/lib/constants';
import { z } from 'zod';

const LoginResponse = z.object({
  token: z.string(),
});

const LoginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const login = async (email: string, password: string) => {
  // TODO: Implement login and store token safely
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const validatedCredentials = LoginRequest.parse({ email, password });

  const response = await fetch(API_BASE_URL + '/api/auth/token', {
    method: 'POST',
    body: JSON.stringify(validatedCredentials),
  });

  if (!response.ok) {
    throw new Error('Invalid email or password');
  }

  const { token } = await response.json();
  const validatedToken = LoginResponse.parse({ token });

  return validatedToken;
};
