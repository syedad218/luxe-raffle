import { getRaffle } from '@/server-functions/getRaffles';
import { Suspense } from 'react';
import RaffleDetails from '@/components/raffle-details/raffle-details';

interface RafflePageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

const Page = async ({ raffleId }: { raffleId: number }) => {
  const raffle = await getRaffle(raffleId);

  return <RaffleDetails />;
};

export default async function RafflePage({ params }: RafflePageProps) {
  const { id } = await params;
  const raffleId = parseInt(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page raffleId={raffleId} />
    </Suspense>
  );
}
