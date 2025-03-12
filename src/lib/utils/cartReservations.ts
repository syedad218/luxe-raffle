import { CartReservation } from '@/types/CartReservations';

export const createNewCartReservation = (
  cartId: string,
  raffleId: number,
  quantity: number,
) => {
  const reservationId = crypto.randomUUID();
  const expiresAt = getCartReservationExpiration();
  const reservation: CartReservation = {
    id: reservationId,
    cartId,
    productId: raffleId,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
    status: 'active',
    quantity,
  };

  return reservation;
};

export const getCartReservationExpiration = () => {
  return new Date(Date.now() + 1000 * 60 * 60 * 24);
};

export const getCartReservationStatus = (reservation: CartReservation) => {
  if (new Date(reservation.expiresAt) < new Date()) {
    return 'expired';
  }

  return reservation.status;
};
