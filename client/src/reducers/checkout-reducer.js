const initialState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  status: 'idle',
  error: null
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETTING_CHECKOUT_FIELDS': {
      return {
        ...state,
        status: 'setting'
      }
    }

    case 'SET_CHECKOUT_FIELDS': {
      return {
        ...state,
        firstName: action.checkout.firstName,
        lastName: action.checkout.lastName,
        address1: action.checkout.address1,
        address2: action.checkout.address2,
        email: action.checkout.email,
        cardNumber: action.checkout.cardNumber,
        expiry: action.checkout.expiry,
        cvv: action.checkout.cvv,
        status: 'idle'
      };
    }

    case 'SET_CHECKOUT_FIELDS_ERROR': {
      return {
        ...state,
        status: 'error',
        error: action.message
      }
    }

    case 'RESET_CHECKOUT_FIELDS': {
      return {
        ...initialState
      }
    }

    default: {
      return state;
    }
  }
};

export default checkoutReducer;
