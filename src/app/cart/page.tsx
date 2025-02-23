import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getCart } from '@/server-functions/getCart';
import { Cart } from '@/types/Cart';
import EditQuantityButton from '@/components/cart/edit-quantity-button';
import DeleteButton from '@/components/cart/delete-button';

export default async function CartPage() {
  const cart: Cart | undefined = await getCart();
  const items = cart?.items ?? [];
  const isEmptyCart = items.length === 0;

  const handleCheckout = () => {
    // TODO: Implement this. Redirect to /account
  };

  return (
    <div className="rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-8">
        {isEmptyCart ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => {
              const { raffleId, name, imageSrc, quantity } = item;
              return (
                <li key={raffleId} className="flex items-center space-x-4">
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <EditQuantityButton type="minus" productId={raffleId} />
                      <span className="font-medium">{quantity}</span>
                      <EditQuantityButton type="plus" productId={raffleId} />
                    </div>
                  </div>
                  <DeleteButton productId={raffleId} />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {!isEmptyCart && (
        <div className="flex justify-end">
          {/* <Button variant="default" onClick={handleCheckout}> */}
          <Button variant="default">Checkout</Button>
        </div>
      )}
    </div>
  );
}
