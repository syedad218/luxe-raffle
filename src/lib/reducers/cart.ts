import type {
  CartAction,
  UpdateType,
  CartItem,
  OptimisticCart,
} from '@/types/Cart';

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
