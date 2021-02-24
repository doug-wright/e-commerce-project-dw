import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.categoryFilter);
  const locationFilter = useSelector((state) => state.locationFilter);

  useEffect(() => {
    // Fetch categories
    dispatch(requestCategoryFilters());
    fetch('/api/v1/product/categories')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(receiveCategoryFilters(json.categories));
        } else {
          dispatch(receiveCategoryFiltersError());
          history.push({ pathname: '/error-page' });
        }
      })
      .catch((err) => {
        dispatch(receiveCategoryFiltersError());
        history.push({ pathname: '/error-page' });
      });
    // Fetch body locations
    dispatch(requestLocationFilters());
    fetch('/api/v1/product/locations')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(receiveLocationFilters(json.bodyLocations));
        } else {
          dispatch(receiveLocationFiltersError());
          history.push({ pathname: '/error-page' });
        }
      })
      .catch((err) => {
        dispatch(receiveLocationFiltersError());
        history.push({ pathname: '/error-page' });
      });
  }, [dispatch, history]);

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

  if (categoryFilter.status !== 'idle' || locationFilter.status !== 'idle') {
    return <>Loading...</>;
  } else {
    return (
      <>
        <FilterTitle>Filters</FilterTitle>
        <p>Filter by category:</p>
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
        <p>OR/then by body location:</p>
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
        <FilterOptions>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </FilterOptions>
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


const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100px;
`;

const Button = styled.button`
  padding: 5px 15px;
  /* font-size: 1rem; */
  font-weight: bold;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #8265a7;
  cursor: pointer;
`;

export default FilterSelect;
