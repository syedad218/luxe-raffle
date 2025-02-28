'use server';

import { updateUserCart } from '@/server-functions/cart';
import { login } from '@/server-functions/login';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { decryptToken } from '@/lib/token';
import { getZodErrorObject } from '@/lib/utils/error';
import { redirect } from 'next/navigation';

export const userLogin = async (
  prevState: unknown,
  payload: {
    formData: FormData;
    redirectPath: string;
  },
) => {
  const { formData, redirectPath } = payload;

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
      if (newCartId && guestCartId !== newCartId) {
        cookieStore.set('cartId', newCartId, {
          expires: new Date(expiration),
        });
      }
      if (cartCount !== 0) cookieStore.set('cartCount', cartCount.toString());
    }
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

  redirect(redirectPath);
};
