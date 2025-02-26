import { cookies } from 'next/headers';
import { decryptToken } from '@/lib/token';
import { User } from 'lucide-react';
import { UserIcon } from '../user-icon/user-icon';
import Link from 'next/link';

export const UserButton = async () => {
  const token = (await cookies()).get('sid')?.value;
  const user = decryptToken(token || '');
  const firstName = user?.firstName;

  return (
    <>
      {firstName ? (
        <Link href="/account">
          <UserIcon firstName={firstName} />
        </Link>
      ) : (
        <Link href="/login" className="text-gray-600 hover:text-gray-800">
          <User size={24} />
        </Link>
      )}
    </>
  );
};
