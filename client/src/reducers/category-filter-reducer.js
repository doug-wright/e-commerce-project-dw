const initialState = {
  filters: null,
  status: 'loading',
  error: null
};

const categoryFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_CATEGORY_FILTERS': {
      return {
        ...state,
        status: 'loading'
      };
    }

    case 'RECEIVE_CATEGORY_FILTERS': {
      const filters = action.filters.map(filter => {
        return { name: filter, selected: false }
      });

      return {
        ...state,
        filters: filters,
        status: 'idle'
      };
    }

    case 'RECEIVE_CATEGORY_FILTERS_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    default:
      return state;
  }
};

export default categoryFilterReducer;
