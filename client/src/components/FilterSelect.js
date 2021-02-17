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
  clearCategoryFilters,
  clearLocationFilters,
  setUrl
} from '../actions';

const FilterSelect = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.categoryFilter);
  const locationFilter = useSelector((state) => state.locationFilter);

  useEffect(() => {
    // Fetch categories
    dispatch(requestCategoryFilters());
    fetch('/api/v1/product/categories')
      .then((res) => res.json())
      .then((json) => dispatch(receiveCategoryFilters(json.data.categories)))
      .catch((err) => dispatch(receiveCategoryFiltersError()));

    // Fetch body locations
    dispatch(requestLocationFilters());
    fetch('/api/v1/product/locations')
      .then((res) => res.json())
      .then((json) => dispatch(receiveLocationFilters(json.data.bodyLocations)))
      .catch((err) => dispatch(receiveLocationFiltersError()));
  }, [dispatch]);

  const handleApplyFilters = () => {
    let categories = '';
    let locations = '';
    let queryString = '';

    if (Object.values(categoryFilter.filters).every(value => value === false) && Object.values(locationFilter.filters).every(value => value === false)) {
      console.log('no filters set');
    } else {
      Object.keys(categoryFilter.filters).forEach(filterName => {
        if (categoryFilter.filters[filterName]) {
          categories += filterName + ',';
        }
      });

      Object.keys(locationFilter.filters).forEach(filterName => {
        if (locationFilter.filters[filterName]) {
          locations += filterName + ',';
        }
      });
      
      if (categories.length !== 0 && locations.length !== 0) {
        queryString = '?categories=' + categories + '&locations=' + locations;
      } else if (categories.length !== 0) {
        queryString = '?categories=' + categories;
      } else {
        queryString = '?locations=' + locations;
      }

      dispatch(setUrl('/api/v1/product/filter/', queryString));
      window.scrollTo(0, 0);
    }
  };

  const handleClearFilters = () => {
    dispatch(clearCategoryFilters());
    dispatch(clearLocationFilters());
    dispatch(setUrl('/api/v1/product/index/', ''));
  };

  if (categoryFilter.status === 'loading' || locationFilter.status === 'loading') {
    return <>Loading...</>;
  } else {
    return (
      <>
        <FilterTitle>Filters</FilterTitle>
        <p>Categories:</p>
        {Object.keys(categoryFilter.filters).map((filterName, index) => {
          const checked = categoryFilter.filters[filterName] ? true : false;

          return (
            <Fragment key={'category' + index}>
              <Filter>
                <Input
                  type="checkbox"
                  onChange={(ev) => dispatch(toggleCategoryFilter(ev.target.id))}
                  id={filterName}
                  name={filterName}
                  checked={checked}
                />
                <label htmlFor={filterName}>{filterName}</label>
              </Filter>
            </Fragment>
          );
        })}
        <p>Locations:</p>
        {Object.keys(locationFilter.filters).map((filterName, index) => {
          const checked = locationFilter.filters[filterName] ? true : false;

          return (
            <Fragment key={'location' + index}>
              <Filter>
                <Input
                  type="checkbox"
                  onChange={(ev) => dispatch(toggleLocationFilter(ev.target.id))}
                  id={filterName}
                  name={filterName}
                  checked={checked}
                />
                <label htmlFor={filterName}>{filterName}</label>
              </Filter>
            </Fragment>
          );
        })}
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </>
    );
  }
};

const FilterTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

const Filter = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;

  &:hover {
    border: none;
    border-radius: 3px;
    background-color: #8265a7;
    color: white;
    font-weight: bold;
  }
`;

const Input = styled.input`
  margin-right: 5px;
`;

export default FilterSelect;
