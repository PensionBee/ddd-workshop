export const throwOnDefaultCase = (value: never): never => {
  throw new Error(
    `${value} was unexpectedly handled by a default switch block`
  );
};