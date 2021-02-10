const ITEMS_PER_PAGE = 9;

const initialState = {
  products: null,
  index: 0,
  status: 'loading',
  error: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS': {
      return {
        ...state,
        status: 'loading'
      };
    }

    case 'RECEIVE_PRODUCTS': {
      return {
        ...state,
        products: action.products,
        status: 'idle'
      };
    }

    case 'RECEIVE_PRODUCTS_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    case 'REQUEST_PRODUCTS_NEXT': {
      return {
        ...state,
        status: 'loading',
        index: state.index + ITEMS_PER_PAGE
      };
    }

    case 'RECEIVE_PRODUCTS_NEXT': {
      return {
        ...state,
        products: action.products,
        status: 'idle'
      };
    }

    case 'RECEIVE_PRODUCTS_NEXT_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    case 'REQUEST_PRODUCTS_BACK': {
      return {
        ...state,
        status: 'loading',
        index: state.index - ITEMS_PER_PAGE
      };
    }

    case 'RECEIVE_PRODUCTS_BACK': {
      return {
        ...state,
        products: action.products,
        status: 'idle'
      };
    }

    case 'RECEIVE_PRODUCTS_BACK_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    default:
      return state;
  }
};

export default productsReducer;
