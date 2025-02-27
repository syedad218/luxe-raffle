import Image from 'next/image';
import { Ticket } from 'lucide-react';
import type { OrderItem } from '@/types/OrderItem';
import { formatCurrency } from '@/lib/utils/formatting';

export default function OrderItem({ item }: { item: OrderItem }) {
  return (
    <div key={item.id} className="p-4 flex justify-between items-center">
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
        <div className="font-medium">{formatCurrency(item.price)}</div>
        {item.quantity > 1 && (
          <div className="text-sm text-gray-500">
            {formatCurrency(Number(item.price / item.quantity))} each
          </div>
        )}
      </div>
    </div>
  );
}
