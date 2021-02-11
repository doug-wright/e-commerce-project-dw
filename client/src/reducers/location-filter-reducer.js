const initialState = {
  filters: null,
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

    case 'RECEIVE_LOCATION_FILTERS': {
      const filters = action.filters.map(filter => {
        return { name: filter, selected: false }
      });

      return {
        ...state,
        filters: filters,
        status: 'idle'
      };
    }

    case 'RECEIVE_LOCATION_FILTERS_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }
    default:
      return state;
  }
};

export default locationFilterReducer;
