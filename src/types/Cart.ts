export type CartItem = {
  raffleId: number;
  quantity: number;
  addedAt: string;
  cost: number;
  imageSrc: string;
  name: string;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
};
