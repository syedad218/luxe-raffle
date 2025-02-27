import type {
  CartAction,
  UpdateType,
  CartItem,
  OptimisticCart,
} from '@/types/Cart';
import { Raffle } from '@/types/Raffle';
import { Cart } from '@/types/Cart';

export const updateCartItem = (
  item: CartItem,
  updateType: UpdateType,
): OptimisticCart | null => {
  if (updateType === 'delete') return { ...item, isPending: true };

  const newQuantity = item.quantity + (updateType === 'plus' ? 1 : -1);
  if (newQuantity === 0) return { ...item, isPending: true };

  const singleItemCost = Number(item.cost) / item.quantity;
  const newTotalCost = singleItemCost * newQuantity;

  return {
    ...item,
    quantity: newQuantity,
    cost: newTotalCost,
  };
};

export const cartReducer = (
  state: OptimisticCart[],
  action: CartAction,
): OptimisticCart[] => {
  const currentItems = state;

  const { raffleId } = action.payload;
  const updateType = action.type;

  const updatedItems = currentItems
    .map((item) =>
      item.raffleId === raffleId ? updateCartItem(item, updateType) : item,
    )
    .filter(Boolean) as OptimisticCart[];

  if (updatedItems.length === 0) return [];

  return updatedItems;
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
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
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
