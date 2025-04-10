export const API_BASE_URL = 'http://localhost:3000';

export const CART_EXPIRATION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export const errorMessages = {
  login: {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters long',
    invalid: 'Invalid email or password',
  },
  cart: {
    emptyProduct: 'No product provided',
    noCart: 'No cart found',
    itemNotFound: 'Item not found in cart',
  },
  order: {
    placeOrderfailed: 'Failed to place order! ',
    getOrdersFailed: 'Failed to get orders! ',
    validationFailed:
      "The data received doesn't match what we expected. Please try again later.",
  },
  raffles: {
    getRafflesFailed: 'Failed to get raffles! ',
  },
};
