# LuxeRaffle E-commerce Features

<div align="center">
  <table border="0">
    <tr>
      <td align="center" width="200">
        <a href="https://nextjs.org/">
          <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" width="80" height="80" alt="Next.js" />
        </a>
      </td>
      <td align="center" width="200">
        <a href="https://react.dev/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="80" height="80" alt="React" />
        </a>
      </td>
      <td align="center" width="200">
        <a href="https://ui.shadcn.com/">
          <img src="https://ui.shadcn.com/apple-touch-icon.png" width="80" height="75" alt="Shadcn/UI" style="background-color: transparent; padding: 10px; border-radius: 20px;" />
        </a>
      </td>
      <td align="center" width="200">
        <a href="https://tailwindcss.com/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="80" height="75" alt="Tailwind CSS" />
        </a>
      </td>
    </tr>
  </table>
</div>

## Project Overview

LuxeRaffle is a luxury car raffle platform that allows users to purchase tickets for a chance to win high-end automobiles. This PR implements core e-commerce functionality including cart management, checkout flow, order history, and user authentication.

## Technologies Used

- **▲ Next.js**: 15.1.6 with App Router
- **⚛️ React**: 19.0.0 with Server Components
- **🎨 Tailwind CSS**: 3.4.1 with Shadcn/UI components
- **🔷 TypeScript**: 5
- **🛡️ Zod**: 3.24.1
- **🎭 Lucide React**: 0.473.0
- **🔐 Authentication**: Custom token-based auth with cookie persistence
- **⚡ Development**: Turbopack for faster dev experience

## Key Concepts

- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)**: Used for server-side data mutations with client-side form handling
- **[Optimistic Updates](https://react.dev/reference/react/useOptimistic)**: Implemented with `useOptimistic` hook for responsive UX
- **[Streaming UI](https://react.dev/reference/react/Suspense)**: Leveraged Suspense and streaming for progressive rendering
- **[React Transitions](https://react.dev/reference/react/startTransition)**: Using `startTransition` to ensure proper order of UI updates
- **[Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)**: Graceful error handling with custom fallbacks
- **[RSC + RCC Architecture](https://nextjs.org/docs/app/building-your-application/rendering/server-components)**: Hybrid approach combining React Server Components with Client Components
- **[Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)**: Route protection and auth verification
- **[Data Caching](https://nextjs.org/docs/app/building-your-application/caching)**: Strategic cache invalidation with revalidation tags

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
