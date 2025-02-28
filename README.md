# LuxeRaffle E-commerce Features

This PR implements core e-commerce functionality for the LuxeRaffle application, including cart management, checkout flow, order history, and user authentication.

## Key Changes

### Cart Management

- Implemented full cart functionality with add, update, and remove server actions
- Added cart persistence with cookie using `cartId`
- Created optimistic UI updates for better user experience
- **Added Guest Cart and User Cart merge logic upon login for seamless shopping experience**
- Display error messages and reset cart state on error in cart actions

```typescript
// Example of optimistic UI update in cart
export const cartReducer = (
  state: OptimisticCart[],
  action: CartAction,
): OptimisticCart[] => {
  // Optimistically update cart state
  return newCart;
};

// Guest cart to user cart merging functionality
export const mergeUserAndGuestCart = (userCart: Cart, guestCart: Cart) => {
  //1. If both user and guest cart are empty, return empty cart

  //2. If user cart doesn't exist, update guest cart as user new user cart

  //3. If users cart exists, but guest cart is empty, return user cart as is

  //4. Merge guest cart items into user cart, if user cart exists

  return { cartTotalQuantity: userCart.totalQuantity, mergedCart: userCart };
};
```

### User Authentication

- Added login functionality with form validation
- Implemented protected routes with middleware
- Added user session management using sid cookie

```typescript
// Middleware for protected routes
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/account' || path.startsWith('/account/')) {
    const userToken = request.cookies.get('sid');

    if (!userToken) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
```

### Checkout Process

- Added checkout flow with order confirmation
- Added server-side order processing
- Guest checkout is not possible at the moment, only logged in users can place orders

### Order History

- Created order history component in user account
- Added detailed order information display

### UI Improvements

- Added loading skeletons for better perceived performance
- Implemented error boundaries for graceful error handling
- Added responsive design for cart and checkout pages
- Ability to reset error boundary and re-render by clicking on try again button
- Detailed Cart Page with a dedicated section for order summary and checkout button

```tsx
// Loading skeleton example
<ErrorBoundary fallback={ErrorPage}>
  <Suspense fallback={<OrderHistoryLoadingSkeleton />}>
    <OrderHistory />
  </Suspense>
</ErrorBoundary>
```

### Type Safety

- Added Zod schemas for runtime validation
- Improved TypeScript types throughout the application

### Bug Fixes

- Fixed incorrect price format in Koenigsegg Jesko item (changed from string to number)
- Updated cart and order data structure to support detailed order information
- Improved error handling across the application
- Added NotFound 404 route and fixed sub-route navigation issue

## Technical Details

- Used React Server Components where appropriate
- Implemented server actions for data mutations
- Added optimistic updates for better UX
- Used cookies for cart and session persistence
- Added proper data validation with Zod
- Added proper caching and cache invalidations using revalidateTag and time based cache revalidation
