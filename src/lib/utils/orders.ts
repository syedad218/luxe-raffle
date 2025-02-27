import { CartItem } from '@/types/Cart';

export const generateOrderItemsFromCart = (items: CartItem[]) =>
  items?.map((item) => ({
    id: item.raffleId,
    quantity: item.quantity,
    imageSrc: item.imageSrc,
    name: item.name,
    description: item.description,
    price: item.cost,
  }));
