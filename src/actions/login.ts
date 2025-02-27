'use server';

import { updateCartWithUserId } from '@/server-functions/cart';
import { login } from '@/server-functions/login';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { FormState } from '@/types/Login';
import { decryptToken } from '@/lib/token';

export const userLogin = async (
  prevState: unknown,
  formData: FormData,
): Promise<FormState> => {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { token } = await login(email, password);
    const cookieStore = await cookies();
    cookieStore.set('sid', token.toString());
    const userId = decryptToken(token || '')?.id;

    // read cartId from cookies and update it with the userId
    const cartId = cookieStore.get('cartId')?.value;
    if (cartId && userId) {
      updateCartWithUserId(cartId, userId);
    }

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    const rawInputs = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    if (error instanceof z.ZodError) {
      return {
        success: false,
        inputs: rawInputs,
        errors: error.errors.reduce((acc: Record<string, string>, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {}),
      };
    }

    return {
      success: false,
      inputs: rawInputs,
      errors: {
        custom: 'Invalid email or password',
      },
    };
  }
};
