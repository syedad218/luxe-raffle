'use server';

import { readDatabase, writeDatabase } from '@/app/(please-ignore)/api/db';
import { decryptToken } from '@/lib/token';
import type { Raffle } from '@/types/Raffle';
import { cookies } from 'next/headers';

export const createCart = async (
  cartId: string,
  userId: number | undefined,
) => {
  const db = await readDatabase();
  db.carts[cartId] = {
    id: cartId,
    userId: userId,
    items: [],
    totalQuantity: 0,
    totalCost: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  if (userId && db.userCart[userId] !== cartId) {
    db.userCart[String(userId)] = cartId;
  }

  await writeDatabase(db);

  return db.carts[cartId];
};

export const updateCartWithUserId = async (cartId: string, userId: number) => {
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
}: {
  product: Raffle;
  quantity: number;
  cartId: string;
}) => {
  const db = await readDatabase();
  let cart = db.carts[cartId];
  if (!cart) {
    const token = (await cookies()).get('sid')?.value;
    const userId = decryptToken(token || '')?.id;
    cart = await createCart(cartId, userId);
  }
  // check if item exists in cart else add it
  const existingItem = cart.items.find((item) => item.raffleId === product.id);

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.cost += product.ticketPrice * quantity;
  } else {
    cart.items.push({
      raffleId: product.id,
      quantity,
      addedAt: new Date().toISOString(),
      cost: product.ticketPrice * quantity,
      imageSrc: product.image,
      name: product.name,
      description: product.description,
    });
  }
  cart.totalQuantity += quantity;
  cart.totalCost += product.ticketPrice * quantity;
  cart.updatedAt = new Date().toISOString();
  cart.expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();

  db.carts[cartId] = cart;

  await writeDatabase(db);

  return cart.totalQuantity;
};

export const removeFromCart = async ({
  productId,
  cartId,
}: {
  productId: Raffle['id'];
  cartId: string;
}) => {
  const db = await readDatabase();
  const cart = db.carts[cartId];
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex((item) => item.raffleId === productId);
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  const item = cart.items[itemIndex];

  // if this item is the last item in the cart, delete the cart
  if (cart.totalQuantity === item.quantity) {
    deleteCart(cartId, cart.userId);
    return 0;
  }

  cart.totalQuantity -= item.quantity;
  cart.totalCost -= item.cost;
  cart.items = cart.items.filter((item) => item.raffleId !== productId);
  cart.updatedAt = new Date().toISOString();
  cart.expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  db.carts[cartId] = cart;

  await writeDatabase(db);

  return cart.totalQuantity;
};

export const updateItemInCart = async ({
  productId,
  cartId,
  updateType,
}: {
  productId: Raffle['id'];
  cartId: string;
  updateType: 'plus' | 'minus';
}) => {
  console.log('updateItemInCart', productId, cartId, updateType);
  const db = await readDatabase();
  const cart = db.carts[cartId];
  if (!cart) {
    throw new Error('Cart not found');
  }

  const existingItem = cart.items.find((item) => item.raffleId === productId);
  if (!existingItem) {
    throw new Error('Item not found in cart');
  }

  const newQuantity = existingItem.quantity + (updateType === 'plus' ? 1 : -1);
  if (newQuantity === 0) return removeFromCart({ productId, cartId });

  const singleItemCost = Number(existingItem.cost) / existingItem.quantity;
  const newTotalCost = singleItemCost * newQuantity;

  const newCartQuantity = cart.totalQuantity + (updateType === 'plus' ? 1 : -1);
  const newCartCost =
    cart.totalCost + (updateType === 'plus' ? singleItemCost : -singleItemCost);

  existingItem.quantity = newQuantity;
  existingItem.cost = newTotalCost;
  cart.totalQuantity = newCartQuantity;
  cart.totalCost = newCartCost;

  cart.updatedAt = new Date().toISOString();
  cart.expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  db.carts[cartId] = cart;

  await writeDatabase(db);

  return cart.totalQuantity;
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
