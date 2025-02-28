'use server';

import { readDatabase, writeDatabase } from '@/app/(please-ignore)/api/db';
import { wait } from '@/lib/wait';
import type { Raffle } from '@/types/Raffle';
import {
  createCartItem,
  mergeUserAndGuestCart,
  updateCartDetails,
} from '@/lib/utils/cart';
import { errorMessages } from '@/lib/constants';
import type { Cart, UpdateType } from '@/types/Cart';
import { updateExistingCartItem, createEmptyCart } from '@/lib/utils/cart';

export const updateUserCart = async (
  guestCartId: string | undefined,
  userId: number,
): Promise<{
  cartCount: number;
  cartId: string;
  expiration: string;
}> => {
  const db = await readDatabase();
  const guestCart = db.carts[guestCartId ?? ''];

  const existingCartId = db.userCart[userId];
  const existingCart = db.carts[existingCartId ?? ''];

  // when user doesn't have guest cart and existing cart, return empty cart
  if (!guestCart && !existingCart) {
    return {
      cartCount: 0,
      cartId: '',
      expiration: '',
    };
  } else if (existingCart && !guestCart) {
    // when guest cart doesn't exist, return the existing cart
    return {
      cartCount: existingCart.totalQuantity,
      cartId: existingCartId,
      expiration: existingCart.expiresAt,
    };
  }

  // when user doesn't have an existing cart in the database, update the guest cart with the userId
  else if (!existingCartId && guestCartId) {
    guestCart.userId = userId;
    db.carts[guestCartId] = guestCart;
    db.userCart[String(userId)] = guestCartId;
    await writeDatabase(db);

    return {
      cartCount: guestCart.totalQuantity,
      cartId: guestCartId,
      expiration: guestCart.expiresAt,
    };
  }

  // when user already has a cart in the database, merge the guest cart with the existing cart
  const { mergedCart, cartTotalQuantity } = mergeUserAndGuestCart(
    existingCart,
    guestCart,
  );
  delete db.carts[guestCartId as string];
  db.carts[existingCartId] = mergedCart;
  await writeDatabase(db);

  return {
    cartCount: cartTotalQuantity,
    cartId: existingCartId,
    expiration: mergedCart.expiresAt,
  };
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

  await wait(200);

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

  await wait(200);

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
