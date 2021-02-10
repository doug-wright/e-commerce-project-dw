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

export const receiveLocationFilters = (locationFilters) => ({
  type: 'RECEIVE_LOCATION_FILTERS',
  locationFilters
});

export const receiveLocationFiltersError = () => ({
  type: 'RECEIVE_LOCATION_FILTERS_ERROR',
});

// Initial product summary actions
export const requestProducts = () => ({
  type: 'REQUEST_PRODUCTS',
});

export const receiveProducts = (products) => ({
  type: 'RECEIVE_PRODUCTS',
  products
});

export const receiveProductsError = () => ({
  type: 'RECEIVE_PRODUCTS_ERROR'
});

// Next page product summary actions
export const requestProductsNext = () => ({
  type: 'REQUEST_PRODUCTS_NEXT'
});

export const receiveProductsNext = (products) => ({
  type: 'RECEIVE_PRODUCTS_NEXT',
  products
});

export const receiveProductsNextError = () => ({
  type: 'RECEIVE_PRODUCTS_NEXT_ERROR'
});

// Previous page product summary actions
export const requestProductsBack = () => ({
  type: 'REQUEST_PRODUCTS_BACK'
});

export const receiveProductsBack = (products) => ({
  type: 'RECEIVE_PRODUCTS_BACK',
  products
});

export const receiveProductsBackError = () => ({
  type: 'RECEIVE_PRODUCTS_BACK_ERROR'
});
