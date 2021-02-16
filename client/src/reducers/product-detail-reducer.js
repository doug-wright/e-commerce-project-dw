const initialState = {
  product: null,
  status: 'loading',
  error: null
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PRODUCT_DETAIL': {
      return {
        ...state,
        status: 'loading'
      };
    }

    case 'RECEIVE_PRODUCT_DETAIL': {
      return {
        ...state,
        product: action.product,
        status: 'idle'
      };
    }

    case 'RECEIVE_PRODUCT_DETAIL_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    default:
      return state;
  }
};

export default productDetailReducer;
