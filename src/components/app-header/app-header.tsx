import Link from 'next/link';
import { Suspense } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartButton } from './cart-nav';
import { UserButton } from './user-nav';
import { User } from 'lucide-react';

export const AppHeader = async () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            LuxeRaffle
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/winners"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Suspense fallback={<User size={24} />}>
            <UserButton />
          </Suspense>
          <Link
            href="/cart"
            className="text-gray-600 hover:text-gray-800 relative"
          >
            <Suspense fallback={<ShoppingCart size={24} />}>
              <CartButton />
            </Suspense>
          </Link>
        </div>
      </div>
    </header>
  );
};
