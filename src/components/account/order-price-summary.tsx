import type { Order } from '@/types/Order';
import { formatCurrency } from '@/lib/utils/formatting';

export default function OrderPriceSummary({ order }: { order: Order }) {
  return (
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
      <div className="text-xs text-gray-500 text-right mt-1">VAT included</div>
    </div>
  );
}
