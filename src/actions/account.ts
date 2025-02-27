'use server';

import { wait } from '@/lib/wait';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleLogout = async () => {
  (await cookies()).delete('sid');

  await wait(500); // simulate API slowness

  redirect('/login');
};
