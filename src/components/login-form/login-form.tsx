'use client';

import { useActionState } from 'react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userLogin } from '@/actions/login';
import { Spinner } from '../ui/spinner';
import { FormState } from '@/types/Login';

const initialState: FormState = {
  success: false,
  inputs: {
    email: '',
    password: '',
  },
  errors: {},
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  // TODO: Make the form work

  const [state, formAction, isPending] = useActionState(
    userLogin,
    initialState,
  );

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={state.inputs?.email}
                  placeholder="m@example.com"
                  required
                  className={cn(
                    state.errors.email &&
                      'border-red-500 focus-visible:ring-red-500',
                  )}
                />
              </div>
              {state.errors.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  defaultValue={state.inputs?.password}
                  required
                  className={cn(
                    state.errors.password &&
                      'border-red-500 focus-visible:ring-red-500',
                  )}
                />
              </div>
              {state.errors.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
              )}
              {state.errors.custom && (
                <div className="border border-red-500 bg-red-50 p-3 rounded-md text-red-700 text-sm">
                  {state.errors.custom}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Spinner size="sm" variant="default" /> : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
