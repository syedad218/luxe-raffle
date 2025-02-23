import { User } from 'lucide-react';
import Link from 'next/link';
import { UserIcon } from '../user-icon/user-icon';
import { CartButton } from '../cart/cartButton';
import { Suspense } from 'react';
import { ShoppingCart } from 'lucide-react';

export const AppHeader = async () => {
  const firstName = ''; // TODO: Somehow get this from the token

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
          {firstName ? (
            <Link href="/account">
              <UserIcon firstName={firstName} />
            </Link>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              <User size={24} />
            </Link>
          )}
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
