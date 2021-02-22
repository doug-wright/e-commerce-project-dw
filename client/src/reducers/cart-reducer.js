const initialState = {
  cart: [],
  status: 'loading',
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CART_ITEMS': {
      return {
        ...state,
        status: 'loading'
      };
    }

    case 'RECEIVE_CART_ITEMS': {
      return {
        ...state,
        cart: action.cart,
        status: 'idle'
      };
    }

    case 'RECEIVE_CART_ITEMS_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    case 'REQUEST_ADD_CART_ITEM': {
      return {
        ...state,
        status: 'adding'
      };
    }

    case 'ADD_CART_ITEM': {
      let newCart = [...state.cart];

      newCart.push(action.cartItem);

      return {
        ...state,
        cart: newCart,
        status: 'idle'
      };
    }

    case 'ADD_CART_ITEM_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    case 'REQUEST_UPDATE_CART_ITEM': {
      return {
        ...state,
        status: 'updating'
      };
    }

    case 'UPDATE_CART_ITEM': {
      let newCart = [...state.cart];
      const index = newCart.findIndex(({ cartId }) => cartId === action.cartItem.cartId);

      newCart.splice(index, 1, action.cartItem);

      return {
        ...state,
        cart: newCart,
        status: 'idle'
      };
    }

    case 'UPDATE_CART_ITEM_ERROR': {
        return {
          ...state,
          status: 'error'
        };
    }

    case 'REQUEST_DELETE_CART_ITEM': {
      return {
        ...state,
        status: 'deleting'
      };
    }

    case 'DELETE_CART_ITEM': {
      let newCart = [...state.cart];
      const index = newCart.findIndex(({ cartId }) => cartId === action.cartId);

      newCart.splice(index, 1);

      return {
        ...state,
        cart: newCart,
        status: 'idle'
      };
    }

    case 'DELETE_CART_ITEM_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }   

    case 'REQUEST_EMPTY_CART': {
      return {
        ...state,
        status: 'emptying'
      };
    }

    case 'EMPTY_CART': {
      return {
        ...state,
        cart: [],
        status: 'idle'
      };
    }

    case 'EMPTY_CART_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
