// Category filter actions
export const requestCategoryFilters = () => ({
  type: 'REQUEST_CATEGORY_FILTERS'
});

export const receiveCategoryFilters = (filters) => ({
  type: 'RECEIVE_CATEGORY_FILTERS',
  filters
});

export const receiveCategoryFiltersError = () => ({
  type: 'RECEIVE_CATEGORY_FILTERS_ERROR',
});

export const toggleCategoryFilter = (filterName) => ({
  type: 'TOGGLE_CATEGORY_FILTER',
  filterName
});

export const clearCategoryFilters = () => ({
  type: 'CLEAR_CATEGORY_FILTERS',
});

// Body location filter actions
export const requestLocationFilters = () => ({
  type: 'REQUEST_LOCATION_FILTERS'
});

export const receiveLocationFilters = (filters) => ({
  type: 'RECEIVE_LOCATION_FILTERS',
  filters
});

export const receiveLocationFiltersError = () => ({
  type: 'RECEIVE_LOCATION_FILTERS_ERROR',
});

export const toggleLocationFilter = (filterName) => ({
  type: 'TOGGLE_LOCATION_FILTER',
  filterName
});

export const clearLocationFilters = () => ({
  type: 'CLEAR_LOCATION_FILTERS',
});

// Product summary actions
export const requestProductsSummary = () => ({
  type: 'REQUEST_PRODUCTS_SUMMARY',
});

export const receiveProductsSummary = (data) => ({
  type: 'RECEIVE_PRODUCTS_SUMMARY',
  products: data.products,
  numProducts: data.numProducts
});

export const receiveProductsSummaryError = () => ({
  type: 'RECEIVE_PRODUCTS_SUMMARY_ERROR'
});

export const requestProductsNext = () => ({
  type: 'REQUEST_PRODUCTS_NEXT'
});

export const requestProductsBack = () => ({
  type: 'REQUEST_PRODUCTS_BACK'
});

export const setUrl = (url, queryString) => ({
  type: 'SET_URL',
  url,
  queryString
});

// Product detail actions
export const requestProductDetail = () => ({
  type: 'REQUEST_PRODUCT_DETAIL',
});

export const receiveProductDetail = (product) => ({
  type: 'RECEIVE_PRODUCT_DETAIL',
  product
});

export const receiveProductDetailError = () => ({
  type: 'RECEIVE_PRODUCT_DETAIL_ERROR'
});
