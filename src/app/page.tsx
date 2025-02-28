import { Suspense } from 'react';
import RafflesLoadingSkeleton from '@/components/loading-skeleton/home';
import RafflesGrid from '@/components/raffles-grid/raffles-grid';
import ErrorBoundary from '@/components/error-boundary';
import { ErrorPage } from '@/components/error';

export const metadata = {
  title: 'LuxeRaffle - Win Luxury Cars',
  description: 'Join our luxury car raffles for a chance to win your dream car',
};

export default async function Home() {
  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">LuxeRaffle</h1>
      <ErrorBoundary fallback={ErrorPage}>
        <Suspense fallback={<RafflesLoadingSkeleton />}>
          <RafflesGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
