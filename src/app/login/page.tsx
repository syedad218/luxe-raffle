import { LoginForm } from '@/components/login-form/login-form';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const token = (await cookies()).get('sid')?.value;

  if (token) {
    redirect('/account');
  }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
