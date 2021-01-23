/**
 * @param {string} limit - limit for return
 * @param {string} pageNumber - number of page
 * @returns {object} - returns object of limits and pageNumber
 */
const paginate = (page, pageSize) => {
  const pageNum = page ? parseInt(page, 10) : 1;
  const limit = pageSize ? parseInt(pageSize, 10) : 10;
  const offset = (pageNum - 1) * limit;
  return { limit, offset };
};

export default {
  paginate,
};
