import { Raffle } from '@/types/Raffle';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import AddToCart from '@/components/cart/add-to-cart';
import Link from 'next/link';
import { slugify } from '@/lib/utils/slugify';

export default function RaffleTile({ raffle }: { raffle: Raffle }) {
  const productSlug = slugify(raffle.name);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <Image
        src={raffle.image || '/placeholder.svg'}
        alt={raffle.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between mb-2 gap-2">
          <h2 className="text-xl font-semibold">{raffle.name}</h2>
          <p className="text-lg font-semibold whitespace-nowrap">
            {raffle.ticketPrice} €
          </p>
        </div>

        <Badge variant="outline" className="mb-2 w-fit">
          {raffle.availableTickets} / {raffle.totalTickets} tickets left
        </Badge>

        <p className="text-gray-600 mb-4">{raffle.description}</p>

        <div className="flex justify-between gap-4 w-full mt-auto">
          <AddToCart product={raffle} />
          <Button className="w-1/3">
            <Link href={`/raffle/${raffle.id}/${productSlug}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
