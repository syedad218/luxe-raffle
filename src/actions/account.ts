'use server';

import { wait } from '@/lib/wait';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('sid').delete('cartId').delete('cartCount');

  await wait(); // simulate API slowness

  redirect('/login');
};
