'use server';

import { readDatabase, writeDatabase } from '@/app/(please-ignore)/api/db';
import type { Raffle } from '@/types/Raffle';

export const createCart = async () => {
  const db = await readDatabase();
  const cartId = crypto.randomUUID();
  db.carts[cartId] = {
    id: cartId,
    userId: '',
    items: [],
    totalQuantity: 0,
    totalCost: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  await writeDatabase(db);

  return cartId;
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
  const cart = db.carts[cartId];
  if (!cart) {
    throw new Error('Cart not found');
  }
  // check if item exists in cart else add it
  const existingItem = cart.items.find((item) => item.raffleId === product.id);

  await new Promise((resolve) => setTimeout(resolve, 2000));

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

  const item = cart.items.find((item) => item.raffleId === productId);
  if (!item) {
    throw new Error('Item not found in cart');
  }

  if (updateType === 'plus') {
    item.quantity += 1;
    item.cost += item.cost;
    cart.totalQuantity += 1;
    cart.totalCost += item.cost;
  } else {
    // if quantity is 1, remove the item
    if (item.quantity === 1) {
      cart.totalQuantity -= item.quantity;
      cart.totalCost -= item.cost;
      cart.items = cart.items.filter((item) => item.raffleId !== productId);
    } else {
      item.quantity -= 1;
      item.cost -= item.cost;
      cart.totalQuantity -= 1;
      cart.totalCost -= item.cost;
    }
  }

  cart.updatedAt = new Date().toISOString();
  cart.expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  db.carts[cartId] = cart;

  await writeDatabase(db);

  return cart.totalQuantity;
};

export const deleteCart = async (cartId: string, userId: any) => {
  const db = await readDatabase();
  delete db.carts[cartId];
  // delete also from userCart if exists
  if (userId && db.userCart[userId] === cartId) {
    delete db.userCart[userId];
  }
  await writeDatabase(db);
};
