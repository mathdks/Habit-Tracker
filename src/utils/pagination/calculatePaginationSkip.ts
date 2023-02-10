export const calculatePaginationSkip = (page, limit) => {
  return page >= 2 ? (page - 1) * limit : 0;
};
