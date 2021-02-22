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

// Cart actions
export const requestCartItems = () => ({
  type: 'REQUEST_CART_ITEMS',
});

export const receiveCartItems = (cart) => ({
  type: 'RECEIVE_CART_ITEMS',
  cart
});

export const receiveCartItemsError = () => ({
  type: 'RECEIVE_CART_ITEMS_ERROR'
});

export const requestAddCartItem = () => ({
  type: 'REQUEST_ADD_CART_ITEM'
});

export const addCartItem = (cartItem) => ({
  type: 'ADD_CART_ITEM',
  cartItem
});

export const addCartItemError = () => ({
  type: 'ADD_CART_ITEM_ERROR'
});

export const requestUpdateCartItem = () => ({
  type: 'REQUEST_UPDATE_CART_ITEM'
});

export const updateCartItem = (cartItem) => ({
  type: 'UPDATE_CART_ITEM',
  cartItem
});

export const updateCartItemError = () => ({
  type: 'UPDATE_CART_ITEM_ERROR'
});

export const requestDeleteCartItem = () => ({
  type: 'REQUEST_DELETE_CART_ITEM'
});

export const deleteCartItem = (cartId) => ({
  type: 'DELETE_CART_ITEM',
  cartId
});

export const deleteCartItemError = () => ({
  type: 'DELETE_CART_ITEM_ERROR'
});

export const requestEmptyCart = () => ({
  type: 'REQUEST_EMPTY_CART'
}); 

export const emptyCart = () => ({
  type: 'EMPTY_CART'
});

export const emptyCartError = () => ({
  type: 'EMPTY_CART_ERROR'
});
