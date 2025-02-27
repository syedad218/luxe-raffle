import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import OrderHistory from '@/components/account/order-history';
import OrderHistoryLoadingSkeleton from '@/components/loading-skeleton/order-history';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/error-boundary';
import { ErrorPage } from '@/components/error';
import UserName from '@/components/account/user-name';
import Logout from '@/components/account/logout';

export default async function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Account</CardTitle>
            <Suspense
              fallback={
                <div className="ml-1 h-5 w-36 bg-gray-200 animate-pulse rounded"></div>
              }
            >
              <UserName />
            </Suspense>
          </div>
          <Logout />
        </CardHeader>
        {/* Order History Listing */}
        <CardContent>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Order History
          </h3>

          <ErrorBoundary fallback={ErrorPage}>
            <Suspense fallback={<OrderHistoryLoadingSkeleton />}>
              <OrderHistory />
            </Suspense>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
