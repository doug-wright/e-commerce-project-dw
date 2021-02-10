const initialState = {
  filters: null,
  selectedFilters: null,
  status: 'loading',
  error: null
};

const locationFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOCATION_FILTERS': {
      return {
        ...state,
        status: 'loading'
      };
    }

    default:
      return state;
  }
};

export default locationFilterReducer;
