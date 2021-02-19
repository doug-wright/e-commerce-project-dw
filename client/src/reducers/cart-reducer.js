const initialState = {
  cart: [],
  status: 'loading',
  error: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CART': {
      return {
        ...state,
        status: 'loading'
      };
    }

    case 'RECEIVE_CART': {
      return {
        ...state,
        cart: action.cart,
        status: 'idle'
      };
    }

    case 'RECEIVE_CART_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    case 'ADD_TO_CART': {
      let newCart = [...state.cart];
      const index = newCart.findIndex(({ productId }) => productId === action.cartItem.productId);

      if (index === -1) {
        newCart.push(action.cartItem);
      } else {
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + 1 };
      }

      return {
        ...state,
        cart: newCart
      };
    }

    case 'REMOVE_FROM_CART': {
      let newCart = [...state.cart];
      const index = newCart.findIndex(({ cartId }) => cartId === action.cartId);

      newCart.splice(index, 1);

      return {
        ...state,
        cart: newCart
      };
    }    

    case 'EMPTY_CART': {
      return {
        ...initialState
      };
    }

    case 'UPDATE_CART_QUANTITY':
      let newCart = [...state.cart];

      newCart[action.index] = { ...newCart[action.index], quantity: Number(action.quantity) };
      return {
        ...state,
        cart: newCart
      };

    default: {
      return state;
    }
  }
};

export default cartReducer;
