import { Raffle } from '@/types/Raffle';
import RaffleTile from '../raffle-tile/raffle-tile';
import { getRaffles } from '@/server-functions/getRaffles';

export default async function RafflesGrid() {
  const raffles: Raffle[] = await getRaffles();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {raffles.map((raffle) => (
        <RaffleTile key={raffle.id} raffle={raffle} />
      ))}
    </div>
  );
}
