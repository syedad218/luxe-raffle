import { LoginForm } from '@/components/login-form/login-form';
import { cookies } from 'next/headers';
import { redirect as nextRedirect } from 'next/navigation';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { redirect } = searchParams;
  const token = (await cookies()).get('sid')?.value;

  if (token) {
    nextRedirect((redirect as string) ?? '/account');
  }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
