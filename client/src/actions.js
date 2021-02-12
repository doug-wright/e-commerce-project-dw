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

// Initial product summary actions
export const requestProducts = () => ({
  type: 'REQUEST_PRODUCTS',
});

export const receiveProducts = (data) => ({
  type: 'RECEIVE_PRODUCTS',
  products: data.products,
  numProducts: data.numProducts
});

export const receiveProductsError = () => ({
  type: 'RECEIVE_PRODUCTS_ERROR'
});

// Next page of products
export const requestProductsNext = () => ({
  type: 'REQUEST_PRODUCTS_NEXT'
});

// Previous page of products
export const requestProductsBack = () => ({
  type: 'REQUEST_PRODUCTS_BACK'
});
