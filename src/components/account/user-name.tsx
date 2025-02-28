import { CardDescription } from '@/components/ui/card';
import { decryptToken } from '@/lib/token';
import { cookies } from 'next/headers';

export default async function UserName() {
  const token = (await cookies()).get('sid')?.value;
  const user = decryptToken(token || '');
  const firstName = user?.firstName;

  return (
    <CardDescription className="ml-1">
      Welcome back, {firstName}!
    </CardDescription>
  );
}
