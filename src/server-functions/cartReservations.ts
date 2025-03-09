import type { Database } from '@/app/(please-ignore)/api/db';
import { errorMessages } from '@/lib/constants';
import {
  getCartReservationStatus,
  getCartReservationExpiration,
  createNewCartReservation,
} from '@/lib/utils/cartReservations';
import type { UpdateType } from '@/types/Cart';

export const createCartReservation = async (
  cartId: string,
  raffleId: number,
  quantity: number,
  db: Database,
) => {
  const raffle = db.raffles.find((r) => r.id === raffleId);
  if (!raffle) {
    throw new Error(errorMessages.raffles.raffleNotFound);
  }

  // check if reservation already exists
  const existingReservation = Object.values(db.cartReservations).find(
    (reservation) =>
      reservation.cartId === cartId && reservation.productId === raffleId,
  );

  if (existingReservation) {
    const status = getCartReservationStatus(existingReservation);
    // check if reservation is active
    if (status === 'active') {
      // check the quantity of the existing reservation
      if (existingReservation.quantity + quantity > raffle.availableTickets) {
        throw new Error(errorMessages.raffles.notEnoughTickets);
      }

      existingReservation.quantity += quantity;
      existingReservation.expiresAt =
        getCartReservationExpiration().toISOString();
      db.cartReservations[existingReservation.id] = existingReservation;

      // Update available tickets
      raffle.availableTickets -= quantity;

      return existingReservation.id;
    } else if (status === 'expired') {
      // delete the reservation
      delete db.cartReservations[existingReservation.id];
    }
  }

  if (quantity > raffle.availableTickets) {
    throw new Error(errorMessages.raffles.notEnoughTickets);
  }

  const reservation = createNewCartReservation(cartId, raffleId, quantity);

  raffle.availableTickets -= quantity;
  db.cartReservations[reservation.id] = reservation;

  return reservation.id;
};

export const updateCartReservation = async (
  reservationId: string,
  updateType: UpdateType,
  db: Database,
) => {
  const reservation = db.cartReservations[reservationId];
  if (!reservation) {
    throw new Error(errorMessages.cartReservations.reservationNotFound);
  }

  const raffle = db.raffles.find((r) => r.id === reservation.productId);
  if (!raffle) {
    throw new Error(errorMessages.raffles.raffleNotFound);
  }

  raffle.availableTickets =
    raffle.availableTickets + (updateType === 'plus' ? 1 : -1);

  reservation.quantity =
    reservation.quantity + (updateType === 'plus' ? 1 : -1);

  db.cartReservations[reservationId] = reservation;

  return reservation.quantity;
};

export const releaseCartReservation = async (
  reservationId: string,
  db: Database,
) => {
  const reservation = db.cartReservations[reservationId];
  if (!reservation) {
    throw new Error(errorMessages.cartReservations.reservationNotFound);
  }

  const raffle = db.raffles.find((r) => r.id === reservation.productId);
  if (!raffle) {
    throw new Error(errorMessages.raffles.raffleNotFound);
  }

  raffle.availableTickets += reservation.quantity;

  delete db.cartReservations[reservationId];

  return reservation.quantity;
};
