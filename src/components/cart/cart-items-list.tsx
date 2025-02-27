'use client';

import { useOptimistic } from 'react';
import EditQuantityButton from '@/components/cart/edit-quantity-button';
import DeleteButton from '@/components/cart/delete-button';
import Image from 'next/image';
import { OptimisticCart } from '@/types/Cart';
import { cartReducer } from '@/lib/utils/cart';

export default function CartItemsList({ items }: { items: OptimisticCart[] }) {
  const [optimisticCartItems, setOptimisticCartItems] = useOptimistic(
    items,
    cartReducer,
  );

  return (
    <div className="w-full md:w-2/3">
      <ul className="space-y-6 divide-y divide-gray-100">
        {optimisticCartItems.map((item) => {
          const {
            raffleId,
            name,
            imageSrc,
            quantity,
            cost,
            description,
            isPending,
          } = item;

          return (
            <li
              key={raffleId}
              className={`pt-6 first:pt-0 ${isPending ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={100}
                  height={80}
                  className="rounded-md object-cover h-24"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-md">{name}</h3>
                  <p className="text-gray-600 text-md mt-1 mb-2">
                    {description}
                  </p>
                  <p className="font-semibold text-md">{cost.toFixed(2)} €</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <EditQuantityButton
                      type="minus"
                      productId={raffleId}
                      setOptimisticCartItems={setOptimisticCartItems}
                    />
                    <span className="font-medium w-8 text-center">
                      {quantity}
                    </span>
                    <EditQuantityButton
                      type="plus"
                      productId={raffleId}
                      setOptimisticCartItems={setOptimisticCartItems}
                    />
                  </div>
                </div>
                <DeleteButton
                  productId={raffleId}
                  setOptimisticCartItems={setOptimisticCartItems}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
