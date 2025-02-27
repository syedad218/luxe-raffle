import { getCart } from '@/server-functions/getCart';
import { Cart } from '@/types/Cart';
import CheckoutSection from '@/components/cart/checkout-section';
import CartItemsList from '@/components/cart/cart-items-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function CartPage() {
  const cart: Cart | undefined = await getCart();
  const items = cart?.items ?? [];
  const isEmptyCart = items.length === 0;

  if (isEmptyCart) {
    return (
      <div className="container mx-auto px-8 py-8 max-w-6xl flex flex-col items-center justify-center">
        <h2>Your cart is empty.</h2>
        <Link href="/">
          <Button className="mt-4">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">
        Your Cart ({items.length} items)
      </h2>
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        {/* Left column - Cart items */}
        <CartItemsList items={items} />

        {/* Right column - Checkout summary (sticky) */}
        <CheckoutSection cart={cart as Cart} />
      </div>
    </div>
  );
}
