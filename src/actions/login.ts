'use server';

import { updateUserCart } from '@/server-functions/cart';
import { login } from '@/server-functions/login';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { FormState } from '@/types/Login';
import { decryptToken } from '@/lib/token';
import { getZodErrorObject } from '@/lib/utils/error';

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

    // get userId and update cart in the database with userId
    const userId = decryptToken(token || '')?.id;
    const guestCartId = cookieStore.get('cartId')?.value;
    if (userId) {
      const {
        cartCount,
        cartId: newCartId,
        expiration,
      } = await updateUserCart(guestCartId, userId);
      if (guestCartId !== newCartId) {
        cookieStore.set('cartId', newCartId, {
          expires: new Date(expiration),
        });
      }
      cookieStore.set('cartCount', cartCount.toString());
    }

    return { success: true, errors: {} };
  } catch (error) {
    const rawInputs = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    if (error instanceof z.ZodError) {
      return {
        success: false,
        inputs: rawInputs,
        errors: getZodErrorObject(error),
      };
    }

    return {
      success: false,
      inputs: rawInputs,
      errors: {
        custom: `${error instanceof Error ? error.message : String(error)}`,
      },
    };
  }
};
