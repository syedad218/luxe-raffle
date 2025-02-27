'use server';

import { readDatabase, writeDatabase } from '@/app/(please-ignore)/api/db';
import { wait } from '@/lib/wait';
import type { Raffle } from '@/types/Raffle';
import {
  createCartItem,
  getCartExpiration,
  updateCartDetails,
} from '@/lib/utils/cart';
import { errorMessages } from '@/lib/constants';
import type { Cart, UpdateType } from '@/types/Cart';
import { updateExistingCartItem } from '@/lib/utils/cart';

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

export const updateUserCart = async (cartId: string, userId: number) => {
  const db = await readDatabase();
  const cart = db.carts[cartId];

  if (!cart || cart.userId === userId) {
    return;
  }

  cart.userId = userId;
  db.carts[cartId] = cart;
  db.userCart[String(userId)] = cartId;
  await writeDatabase(db);
};

export const addToCart = async ({
  product,
  quantity,
  cartId,
  userId,
}: {
  product: Raffle;
  quantity: number;
  cartId: string | undefined;
  userId: number | undefined;
}) => {
  let cart;
  const db = await readDatabase();
  cart = db.carts[cartId ?? ''];

  if (!cart) {
    cart = await createEmptyCart(userId);
  }

  // check if item exists in cart else add it
  const existingItem = cart.items.find((item) => item.raffleId === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.cost += product.ticketPrice * quantity;
  } else {
    cart.items.push(createCartItem(product, quantity));
  }

  const itemTotalCost = product.ticketPrice * quantity;
  cart = updateCartDetails(cart, itemTotalCost, quantity, 'plus');
  db.carts[cart.id] = cart;

  if (userId && db.userCart[userId] !== cart.id) {
    db.userCart[userId] = cart.id;
  }

  await writeDatabase(db);

  await wait(500);

  return { cartCount: cart.totalQuantity, cartId: cart.id };
};

export const removeFromCart = async ({
  itemIndex,
  cart,
  userId,
}: {
  itemIndex: number;
  cart: Cart;
  userId: number | undefined;
}) => {
  const item = cart.items[itemIndex];
  // if this item is the last item in the cart, delete the cart
  if (cart.totalQuantity === item.quantity) {
    await deleteCart(cart.id, userId);
    return { totalQuantity: 0, newCart: undefined };
  }

  cart.items.splice(itemIndex, 1);
  cart = updateCartDetails(cart, item.cost, item.quantity, 'minus');

  return { totalQuantity: cart.totalQuantity, newCart: cart };
};

export const updateItemInCart = async ({
  productId,
  cartId,
  updateType,
  userId,
}: {
  productId: Raffle['id'];
  cartId: string;
  updateType: UpdateType;
  userId: number | undefined;
}) => {
  const db = await readDatabase();
  let cart = db.carts[cartId ?? ''];
  if (!cart) throw new Error(errorMessages.cart.noCart);

  const itemIndex = cart.items.findIndex((item) => item.raffleId === productId);
  if (itemIndex === -1) throw new Error(errorMessages.cart.itemNotFound);

  const existingItem = cart.items[itemIndex];
  const { updatedItem, newQuantity, singleItemCost } = updateExistingCartItem(
    existingItem,
    updateType,
  );

  if (updateType === 'delete' || newQuantity === 0) {
    const { totalQuantity, newCart } = await removeFromCart({
      itemIndex,
      cart,
      userId,
    });
    if (totalQuantity === 0) return totalQuantity;
    else if (newCart) db.carts[cartId] = newCart;
  } else {
    cart.items[itemIndex] = updatedItem;
    cart = updateCartDetails(cart, singleItemCost, 1, updateType);
    db.carts[cartId] = cart;
  }

  await writeDatabase(db);

  await wait(500);

  return db.carts[cartId].totalQuantity;
};

export const deleteCart = async (
  cartId: string,
  userId: number | undefined,
) => {
  const db = await readDatabase();
  delete db.carts[cartId];
  // delete also from userCart if exists
  if (userId && db.userCart[userId] === cartId) {
    delete db.userCart[userId];
  }
  await writeDatabase(db);
};
