export const wait = (ms = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));
