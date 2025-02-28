import { cookies } from 'next/headers';
import { ShoppingCart } from 'lucide-react';

const CartCounter = ({ items }: { items: number }) => (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    {items}
  </span>
);

export const CartButton = async () => {
  const cartCount = (await cookies()).get('cartCount')?.value;

  return (
    <>
      <ShoppingCart size={24} />
      {!!cartCount && <CartCounter items={Number.parseInt(cartCount)} />}
    </>
  );
};
