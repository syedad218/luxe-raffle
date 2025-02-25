import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="h-8 w-48 mb-2 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-5 w-36 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>

        <CardContent>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Order History
          </h3>

          {/* Loading skeleton for 1 order */}
          {[1].map((order) => (
            <div key={order} className="border rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                <div>
                  <div className="h-4 w-32 mb-1 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-16 mb-1 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>

              <div className="divide-y">
                {/* Loading skeleton for 2 items per order */}
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="p-4 flex justify-between items-center"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded flex-shrink-0 bg-gray-200 animate-pulse"></div>
                      <div>
                        <div className="h-5 w-32 mb-2 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 w-48 mb-1 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-3 w-20 mt-1 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-5 w-16 mb-1 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 border-t">
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="flex justify-between font-bold mt-3 pt-3 border-t">
                  <div className="h-5 w-12 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="flex justify-end mt-1">
                  <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-end">
          <div className="h-10 w-28 bg-gray-200 animate-pulse rounded"></div>
        </CardFooter>
      </Card>
    </div>
  );
}
