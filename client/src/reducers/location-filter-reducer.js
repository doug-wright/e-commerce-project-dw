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
      // const filters = action.filters.map(filter => {
      //   return { name: filter, selected: false }
      // });
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

    case 'RECEIVE_LOCATION_FILTERS_ERROR': {
      return {
        ...state,
        status: 'error'
      };
    }

    case 'TOGGLE_LOCATION_FILTER': {
      let filterStatus = false;

      if (state.filters[action.filterName] === false) {
        filterStatus = true;
      } else {
        filterStatus = false;
      }

      return {
        ...state,
        filters: {...state.filters, [action.filterName]: filterStatus},
        status: 'idle'
      };
    }

    case 'CLEAR_LOCATION_FILTERS': {
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

export default locationFilterReducer;
