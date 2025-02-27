import { getOrders } from '@/server-functions/getOrders';
import Link from 'next/link';
import { Order } from '@/types/Order';
import { ShoppingBag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';
import { cookies } from 'next/headers';
import OrderItem from './order-item';
import OrderPriceSummary from './order-price-summary';

export default async function OrderHistory() {
  const userToken = (await cookies()).get('sid')?.value;
  const orders = userToken ? await getOrders(userToken) : [];
  const hasOrders = orders?.length > 0;

  if (!hasOrders) {
    return (
      <div className="text-center py-8 text-gray-500">
        <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>You haven&apos;t purchased any tickets yet.</p>
        <Link href="/">
          <Button className="mt-4">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {orders?.map((order: Order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                Order Date: {formatDate(order.createdAt)}
              </div>
              <div className="font-medium">Order #{order.id.slice(0, 8)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <div className="font-bold">{formatCurrency(order.total)}</div>
            </div>
          </div>

          <div className="divide-y">
            {order.items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <OrderPriceSummary order={order} />
        </div>
      ))}
    </div>
  );
}
