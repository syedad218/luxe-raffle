import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="h-8 w-48 mb-2 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-5 w-36 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>

        <CardContent>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Order History
          </h3>

          {/* Loading skeleton for 1 order */}
        </CardContent>
      </Card>
    </div>
  );
}
