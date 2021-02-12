const initialState = {
  products: null,
  index: 0,
  itemsPerPage: 9,
  numProducts: 0,
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
        numProducts: action.numProducts,
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
      if (state.index + state.itemsPerPage < state.numProducts) {
        return {
          ...state,
          status: 'loading',
          index: state.index + state.itemsPerPage
        };
      } else {
        return state;
      }
    }

    case 'REQUEST_PRODUCTS_BACK': {
      if (state.index > 0) {
        return {
          ...state,
          status: 'loading',
          index: state.index - state.itemsPerPage
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

export default productsReducer;
