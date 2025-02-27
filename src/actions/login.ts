'use server';

import { login } from '@/server-functions/login';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { FormState } from '@/types/Login';

export const userLogin = async (
  prevState: unknown,
  formData: FormData,
): Promise<FormState> => {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { token: userId } = await login(email, password);
    (await cookies()).set('sid', userId.toString());

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
