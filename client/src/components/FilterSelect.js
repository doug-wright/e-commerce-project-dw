import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

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
  const locationFilter = useSelector((state) => state.locationFilter);

  useEffect(() => {
    // Fetch categories
    dispatch(requestCategoryFilters());
    fetch('http://localhost:4000/api/v1/product/categories')
      .then((res) => res.json())
      .then((json) => dispatch(receiveCategoryFilters(json.data.categories)))
      .catch((err) => dispatch(receiveCategoryFiltersError()));

    // Fetch body locations
    dispatch(requestLocationFilters());
    fetch('http://localhost:4000/api/v1/product/locations')
      .then((res) => res.json())
      .then((json) => dispatch(receiveLocationFilters(json.data.bodyLocations)))
      .catch((err) => dispatch(receiveLocationFiltersError()));
  }, []);

  const handleCategorySelect = (ev) => {
    console.log(ev.target.id);
    console.log(ev.target.checked);
  };

  const handleLocationSelect = (ev) => {
    console.log(ev.target.id);
    console.log(ev.target.checked);
  };

  if (categoryFilter.status === 'loading' || locationFilter.status === 'loading') {
    return <>Loading...</>;
  } else {
    return (
      <>
        <FilterTitle>Filters</FilterTitle>
        <p>Categories:</p>
        {categoryFilter.filters.map((filter, index) => {
          return (
            <>
              <input type="checkbox" onClick={handleCategorySelect} id={filter.name} name={filter.name} />
              <label htmlFor={filter.name}>{filter.name}</label>
              <br />
            </>
          );
        })}
        <p>Locations:</p>
        {locationFilter.filters.map((filter, index) => {
          return (
            <>
              <input type="checkbox" onClick={handleLocationSelect} id={filter.name} name={filter.name} />
              <label htmlFor={filter.name}>{filter.name}</label>
              <br />
            </>
          );
        })}
      </>
    );
  }
};

const FilterTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

export default FilterSelect;
