export const formatCurrency = (amount: number) => {
  return `${amount.toFixed(2)} €`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
