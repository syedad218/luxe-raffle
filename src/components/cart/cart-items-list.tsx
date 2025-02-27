'use client';

import { useOptimistic } from 'react';
import { OptimisticCart } from '@/types/Cart';
import { cartReducer } from '@/lib/reducers/cart';
import CartItem from '@/components/cart/cart-item';

export default function CartItemsList({ items }: { items: OptimisticCart[] }) {
  const [optimisticCartItems, setOptimisticCartItems] = useOptimistic(
    items,
    cartReducer,
  );

  return (
    <div className="w-full md:w-2/3">
      <ul className="space-y-6 divide-y divide-gray-100">
        {optimisticCartItems.map((item) => {
          return (
            <li
              key={item.raffleId}
              className={`pt-6 first:pt-0 ${item.isPending ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`}
            >
              <CartItem
                setOptimisticCartItems={setOptimisticCartItems}
                item={item}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
