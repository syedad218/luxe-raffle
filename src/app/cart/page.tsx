import { getCart } from '@/server-functions/getCart';
import { Cart } from '@/types/Cart';
import CheckoutButton from '@/components/cart/checkout-button';
import PaymentProviders from '@/components/cart/payment-providers';
import CartItemsList from '@/components/cart/cart-items-list';

export default async function CartPage() {
  const cart: Cart | undefined = await getCart();
  const items = cart?.items ?? [];
  const isEmptyCart = items.length === 0;

  return (
    <div className="container mx-auto px-8 py-8 max-w-6xl">
      {isEmptyCart ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Your Cart ({items.length} items)
          </h2>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            {/* Left column - Cart items */}
            <CartItemsList items={items} />

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

                <CheckoutButton cart={cart} />
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">We accept</p>
                  <PaymentProviders />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
