import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-8 py-8 max-w-6xl flex flex-col items-center justify-center">
      <h2>Your cart is empty.</h2>
      <Link href="/">
        <Button className="mt-4">Browse Products</Button>
      </Link>
    </div>
  );
}
