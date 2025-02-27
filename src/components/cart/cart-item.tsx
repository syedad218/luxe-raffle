import Image from 'next/image';
import EditQuantityButton from '@/components/cart/edit-quantity-button';
import DeleteButton from '@/components/cart/delete-button';
import type { CartItem, CartAction } from '@/types/Cart';

export default function CartItem({
  setOptimisticCartItems,
  item,
}: {
  setOptimisticCartItems: (action: CartAction) => void;
  item: CartItem;
}) {
  const { raffleId, name, description, cost, quantity, imageSrc } = item;

  return (
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
        <p className="text-gray-600 text-md mt-1 mb-2">{description}</p>
        <p className="font-semibold text-md">{cost.toFixed(2)} €</p>
        <div className="flex items-center space-x-2 mt-3">
          <EditQuantityButton
            type="minus"
            productId={raffleId}
            setOptimisticCartItems={setOptimisticCartItems}
          />
          <span className="font-medium w-8 text-center">{quantity}</span>
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
  );
}
