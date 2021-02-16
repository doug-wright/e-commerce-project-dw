import { combineReducers } from 'redux';

// import cart from './cart-reducer';
import categoryFilter from './category-filter-reducer';
import locationFilter from './location-filter-reducer';
import productDetail from './product-detail-reducer';
import productsSummary from './products-summary-reducer';

export default combineReducers({ categoryFilter, locationFilter, productDetail, productsSummary });
