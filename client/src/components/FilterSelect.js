import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  requestCategoryFilters,
  receiveCategoryFilters,
  receiveCategoryFiltersError,
  requestLocationFilters,
  receiveLocationFilters,
  receiveLocationFiltersError,
  toggleCategoryFilter,
  toggleLocationFilter,
  setUrl
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

  // const handleCategorySelect = (ev) => {
  //   dispatch(toggleCategoryFilter(ev.target.id));
  // };

  // const handleLocationSelect = (ev) => {
  //   dispatch(toggleLocationFilter(ev.target.id));
  // };

  const handleApplyFilters = () => {
    if (Object.values(categoryFilter.filters).every(value => value === false) && Object.values(locationFilter.filters).every(value => value === false)) {
      console.log('no filters set');
    } else {
      dispatch(setUrl('http://localhost:4000/api/v1/product/index/9/9'));
    }
  };

  if (categoryFilter.status === 'loading' || locationFilter.status === 'loading') {
    return <>Loading...</>;
  } else {
    return (
      <>
        <FilterTitle>Filters</FilterTitle>
        <p>Categories:</p>
        {Object.keys(categoryFilter.filters).map((filterName, index) => {
          return (
            <Fragment key={'category' + index}>
              <input type="checkbox" onClick={(ev) => dispatch(toggleCategoryFilter(ev.target.id))} id={filterName} name={filterName} />
              <label htmlFor={filterName}>{filterName}</label>
              <br />
            </Fragment>
          );
        })}
        <p>Locations:</p>
        {Object.keys(locationFilter.filters).map((filterName, index) => {
          return (
            <Fragment key={'location' + index}>
              <input type="checkbox" onClick={(ev) => dispatch(toggleLocationFilter(ev.target.id))} id={filterName} name={filterName} />
              <label htmlFor={filterName}>{filterName}</label>
              <br />
            </Fragment>
          );
        })}
        <button onClick={handleApplyFilters}>Apply Filters</button>
      </>
    );
  }
};

const FilterTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

export default FilterSelect;
