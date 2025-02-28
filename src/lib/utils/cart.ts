import type { UpdateType, CartItem } from '@/types/Cart';
import { Raffle } from '@/types/Raffle';
import { Cart } from '@/types/Cart';
import { CART_EXPIRATION_DURATION } from '@/lib/constants';

export const createEmptyCart = async (userId: number | undefined) => {
  const cartId = crypto.randomUUID();

  const cart = {
    id: cartId,
    userId: userId,
    items: [],
    totalQuantity: 0,
    totalCost: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: getCartExpiration().toISOString(),
  };

  return cart;
};

export const createCartItem = (product: Raffle, quantity = 1): CartItem => {
  return {
    raffleId: product.id,
    quantity,
    addedAt: new Date().toISOString(),
    cost: product.ticketPrice * quantity,
    imageSrc: product.image,
    name: product.name,
    description: product.description,
  };
};

export const getCartExpiration = (): Date => {
  return new Date(Date.now() + CART_EXPIRATION_DURATION);
};

export const updateCartDetails = (
  cart: Cart,
  itemTotalCost: number,
  quantity = 1,
  updateType: UpdateType,
): Cart => {
  const { totalQuantity, totalCost } = cart;

  return {
    ...cart,
    totalQuantity:
      totalQuantity + (updateType === 'plus' ? quantity : -quantity),
    totalCost:
      totalCost + (updateType === 'plus' ? itemTotalCost : -itemTotalCost),
    updatedAt: new Date().toISOString(),
    expiresAt: getCartExpiration().toISOString(),
  };
};

export const updateExistingCartItem = (
  item: CartItem,
  updateType: UpdateType,
) => {
  if (updateType === 'delete') {
    return { newQuantity: 0, updatedItem: item, singleItemCost: 0 };
  }

  const newQuantity = item.quantity + (updateType === 'plus' ? 1 : -1);
  const singleItemCost = Number(item.cost) / item.quantity;
  const newTotalCost = singleItemCost * newQuantity;
  const updatedItem = {
    ...item,
    quantity: newQuantity,
    cost: newTotalCost,
  };

  return { updatedItem, newQuantity, singleItemCost };
};

export const mergeUserAndGuestCart = (userCart: Cart, guestCart: Cart) => {
  const existingItemMap = new Map(
    userCart.items.map((item) => [item.raffleId, item]),
  );

  guestCart.items.forEach((guestItem) => {
    const existingItem = existingItemMap.get(guestItem.raffleId);
    if (existingItem) {
      // instead of adding the quantity, pick the max quantity
      const newQuantity = Math.max(existingItem.quantity, guestItem.quantity);
      const singleItemCost = Number(guestItem.cost) / guestItem.quantity;
      existingItem.quantity = newQuantity;
      existingItem.cost = singleItemCost * newQuantity;
    } else {
      userCart.items.push(guestItem);
    }
  });

  const cartTotalCost = userCart.items.reduce(
    (total, item) => total + item.cost,
    0,
  );
  const cartTotalQuantity = userCart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  userCart.totalCost = cartTotalCost;
  userCart.totalQuantity = cartTotalQuantity;
  userCart.updatedAt = new Date().toISOString();
  userCart.expiresAt = getCartExpiration().toISOString();

  return { cartTotalQuantity, mergedCart: userCart };
};
