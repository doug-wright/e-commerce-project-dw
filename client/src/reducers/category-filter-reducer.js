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
      const filters = {};

      action.filters.forEach(filter => {
        filters[filter] = false;
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

    case 'TOGGLE_CATEGORY_FILTER': {
      let filterStatus = false;

      if (state.filters[action.filterName] === false) {
        filterStatus = true;
      } else {
        filterStatus = false;
      }

      return {
        ...state,
        filters: {...state.filters, [action.filterName]: filterStatus},
        status: 'error'
      };
    }

    case 'CLEAR_CATEGORY_FILTERS': {
      let newFilter = {};
      Object.keys(state.filters).forEach(key => {
        newFilter[key] = false;
      });

      return {
        ...state,
        filters: newFilter
      }
    }

    default:
      return state;
  }
};

export default categoryFilterReducer;
