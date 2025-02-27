import { getOrders } from '@/server-functions/getOrders';
import Link from 'next/link';
import { Order } from '@/types/Order';
import { ShoppingBag, Calendar, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function OrderHistory() {
  const userToken = (await cookies()).get('sid')?.value;
  const orders = userToken ? await getOrders(userToken) : [];

  return (
    <>
      {orders?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>You haven&apos;t purchased any tickets yet.</p>
          <Link href="/">
            <Button className="mt-4">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders?.map((order: Order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Order Date: {formatDate(order.createdAt)}
                  </div>
                  <div className="font-medium">
                    Order #{order.id.slice(0, 8)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Total</div>
                  <div className="font-bold">{formatCurrency(order.total)}</div>
                </div>
              </div>

              <div className="divide-y">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex justify-between items-center"
                  >
                    <div className="flex items-start gap-4">
                      {item.imageSrc && (
                        <div className="rounded w-16 h-16 overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.imageSrc}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.description && <p>{item.description}</p>}
                          <div className="flex items-center mt-1">
                            <Ticket className="h-3 w-3 mr-1" />
                            Quantity: {item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatCurrency(item.price)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-sm text-gray-500">
                          {formatCurrency(Number(item.price / item.quantity))}{' '}
                          each
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                {order.shipping !== undefined && (
                  <div className="flex justify-between text-sm mb-2">
                    <span>Shipping</span>
                    <span>{formatCurrency(order.shipping)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold mt-3 pt-3 border-t">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
                <div className="text-xs text-gray-500 text-right mt-1">
                  VAT included
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
