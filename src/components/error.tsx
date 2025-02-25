'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const router = useRouter();

  const refreshAndReset = () => {
    startTransition(() => {
      router.refresh();
      if (reset) reset();
    });
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={refreshAndReset}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Try again
        </button>
        <p className="mt-4 text-xs text-gray-500">
          If the problem persists, please contact support
        </p>
      </div>
    </div>
  );
};
