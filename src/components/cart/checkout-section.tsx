import CheckoutButton from './checkout-button';
import PaymentProviders from './payment-providers';
import type { Cart } from '@/types/Cart';

export default function CheckoutSection({ cart }: { cart: Cart }) {
  const { totalCost } = cart;

  return (
    <div className="w-full md:w-1/3 drop-shadow-md">
      <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{totalCost.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>0.00 €</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{totalCost.toFixed(2)} €</span>
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
  );
}
