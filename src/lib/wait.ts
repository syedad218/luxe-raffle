export const wait = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
