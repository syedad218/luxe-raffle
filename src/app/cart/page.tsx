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
    <div className="container mx-auto px-8 py-8 max-w-6xl">
      {isEmptyCart ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Your Cart ({items.length} items)
          </h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Left column - Cart items */}
            <div className="w-full md:w-2/3">
              <ul className="space-y-6 divide-y divide-gray-100">
                {items.map((item) => {
                  const {
                    raffleId,
                    name,
                    imageSrc,
                    quantity,
                    cost,
                    description,
                  } = item;
                  return (
                    <li key={raffleId} className="pt-6 first:pt-0">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={imageSrc}
                          alt={name}
                          width={100}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-md">{name}</h3>
                          <p className="text-gray-600 text-md mt-1 mb-2">
                            {description}
                          </p>
                          <p className="font-semibold text-md">
                            {cost.toFixed(2)} €
                          </p>
                          <div className="flex items-center space-x-2 mt-3">
                            <EditQuantityButton
                              type="minus"
                              productId={raffleId}
                            />
                            <span className="font-medium w-8 text-center">
                              {quantity}
                            </span>
                            <EditQuantityButton
                              type="plus"
                              productId={raffleId}
                            />
                          </div>
                        </div>
                        <DeleteButton productId={raffleId} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right column - Checkout summary (sticky) */}
            <div className="w-full md:w-1/3 drop-shadow-md">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{cart?.totalCost.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>0.00 €</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{cart?.totalCost.toFixed(2)} €</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">VAT included</div>
                </div>

                <Button
                  variant="default"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3"
                >
                  Go to checkout
                </Button>

                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">We accept</p>
                  <div className="flex flex-wrap justify-between">
                    <Image
                      src="/icons/visa.svg"
                      alt="Visa"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="/icons/mastercard.svg"
                      alt="Mastercard"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="/icons/paypal.svg"
                      alt="PayPal"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="/icons/amex.svg"
                      alt="American Express"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="/icons/diners.svg"
                      alt="Diners Club"
                      width={40}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
