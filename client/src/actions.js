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

// Product actions
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

export const requestProductsNext = () => ({
  type: 'REQUEST_PRODUCTS_NEXT'
});

export const requestProductsBack = () => ({
  type: 'REQUEST_PRODUCTS_BACK'
});

export const setUrl = (url) => ({
  type: 'SET_URL',
  url
});
