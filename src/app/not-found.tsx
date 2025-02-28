import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function NotFoundPage() {
  return (
    <div className="bg-transparent flex flex-col items-center justify-center p-4 min-h-[70vh]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you're looking for. It might have been
          removed, renamed, or doesn't exist.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
          {/* Using <a> tag since Link from next/navigation doesn't seems to work */}
          <a href="/">
            <Button className="w-full sm:w-auto">Return Home</Button>
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          If you believe this is an error, please contact support
        </p>
      </div>
    </div>
  );
}
