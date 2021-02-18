const initialState = {
  cart: null,
  status: 'loading',
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CART': {
      return {
        ...state,
        status: 'loading'
      }
    }

    case 'RECEIVE_CART': {
      return {
        ...state,
        cart: action.cart,
        status: 'idle'
      }
    }

    case 'RECEIVE_CART_ERROR': {
      return {
        ...state,
        status: 'error'
      }
    }

    case 'ADD_TO_CART': {
      return {
        ...state
      }
    }

    case 'REMOVE_FROM_CART': {
      let newCart = state.cart;
      const index = newCart.findIndex(({ cartId }) => cartId === action.cartId);

      newCart.splice(index, 1);

      if (newCart.length === 0) {
        newCart = null;
      }

      return {
        ...state,
        cart: newCart
      }
    }    

    case 'EMPTY_CART': {
      return {
        initialState
      }
    }

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state
      }

    default: {
      return state;
    }
  }
};

export default cartReducer;
