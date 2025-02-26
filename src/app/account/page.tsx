import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { decryptToken } from '@/lib/token';
import { LogOut, ShoppingBag } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import OrderHistory from '@/components/account/order-history';
import OrderHistoryLoadingSkeleton from '@/components/loading-skeleton/order-history';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/error-boundary';
import { ErrorPage } from '@/components/error';

export default async function AccountPage() {
  const handleLogout = async () => {
    'use server';
    (await cookies()).delete('sid');
    redirect('/login');
  };

  const token = (await cookies()).get('sid')?.value;
  const user = decryptToken(token || '');
  const firstName = user?.firstName;

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Account</CardTitle>
            <CardDescription>Welcome back, {firstName}!</CardDescription>
          </div>
          <form action={handleLogout}>
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </form>
        </CardHeader>

        <CardContent>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Order History
          </h3>

          <ErrorBoundary fallback={ErrorPage}>
            <Suspense fallback={<OrderHistoryLoadingSkeleton />}>
              <OrderHistory userToken={token} />
            </Suspense>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
