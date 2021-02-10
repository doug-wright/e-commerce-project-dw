import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  requestCategoryFilters,
  receiveCategoryFilters,
  receiveCategoryFiltersError,
  requestLocationFilters,
  receiveLocationFilters,
  receiveLocationFiltersError
} from '../actions';

const FilterSelect = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.categoryFilter);
  const locationFilter = useSelector((state) => state.locationFilter.filters);

  useEffect(() => {
    dispatch(requestCategoryFilters());
    fetch('http://localhost:4000/api/v1/product/categories')
      .then((res) => res.json())
      .then((json) => dispatch(receiveCategoryFilters(json.data.categories)))
      .catch((err) => dispatch(receiveCategoryFiltersError()));
  }, []);

  if (categoryFilter.status === 'loading') {
    return <>Loading...</>;
  } else {
    return (
      <>
        {categoryFilter.filters.map(filter => <p>{filter}</p>)}
      </>
    );
  }
};

export default FilterSelect;
