import { combineReducers } from 'redux';

import categoryFilter from './category-filter-reducer';
import locationFilter from './location-filter-reducer';
import productDetail from './product-detail-reducer';
import productsSummary from './products-summary-reducer';
import userCart from './cart-reducer';
import checkout from './checkout-reducer';

export default combineReducers({
  categoryFilter,
  locationFilter,
  productDetail,
  productsSummary,
  userCart,
  checkout
});
