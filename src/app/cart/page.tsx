import { Suspense } from 'react';
import { getCart } from '@/server-functions/getCart';
import { Cart } from '@/types/Cart';
import CheckoutSection from '@/components/cart/checkout-section';
import CartItemsList from '@/components/cart/cart-items-list';
import { cookies } from 'next/headers';
import EmptyCart from '@/components/cart/empty-cart';
import CartLoadingSkeleton from '@/components/loading-skeleton/cart';
import { ErrorPage } from '@/components/error';
import ErrorBoundary from '@/components/error-boundary';

const CartListPage = async ({ cartId }: { cartId: string }) => {
  const cart: Cart | undefined = await getCart({ cartId });
  const items = cart?.items ?? [];
  const isEmptyCart = items.length === 0;

  if (isEmptyCart) return <EmptyCart />;

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
};

export default async function CartPage() {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) return <EmptyCart />;

  return (
    <ErrorBoundary fallback={ErrorPage}>
      <Suspense fallback={<CartLoadingSkeleton />}>
        <CartListPage cartId={cartId} />
      </Suspense>
    </ErrorBoundary>
  );
}
