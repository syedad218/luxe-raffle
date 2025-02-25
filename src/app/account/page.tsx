import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { decryptToken } from '@/lib/token';
import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const handleLogout = async () => {
    'use server';
    (await cookies()).delete('sid');
    redirect('/login');
  };

  const token = (await cookies()).get('sid')?.value;
  const user = decryptToken(token || '');
  const firstName = user?.firstName; // TODO: Somehow get this from the token

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Account Information</CardTitle>
          <CardDescription>Welcome, {firstName}!</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Your Raffle Tickets</h3>
          {/* {tickets.length === 0 ? (
            <p>You haven't purchased any tickets yet.</p>
          ) : (
            <ul className="space-y-4">
              {tickets.map((ticket) => (
                <li key={ticket.id} className="border-b pb-4 last:border-b-0">
                  <p>...</p>
                </li>
              ))}
            </ul>
          )} */}
        </CardContent>
        <CardFooter>
          <form action={handleLogout}>
            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
