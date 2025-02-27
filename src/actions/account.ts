'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleLogout = async () => {
  (await cookies()).delete('sid');

  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API slowness

  redirect('/login');
};
