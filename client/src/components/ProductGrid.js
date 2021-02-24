import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import ProductSummary from './ProductSummary';

import {
  requestProductsSummary,
  receiveProductsSummary,
  receiveProductsSummaryError,
  requestProductsNext,
  requestProductsBack,
} from '../actions';

const ProductGrid = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    index,
    itemsPerPage,
    queryString,
    status,
    numProducts,
    products
  } = useSelector((state) => state.productsSummary);

  useEffect(() => {
    dispatch(requestProductsSummary());
    fetch(url + index + '/' + itemsPerPage + queryString)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(receiveProductsSummary(json));
        } else {
          dispatch(receiveProductsSummaryError());
          history.push({ pathname: '/error-page' });
        }
      })
      .catch((err) => {
        dispatch(receiveProductsSummaryError());
        history.push({ pathname: '/error-page' });
      });
    window.scrollTo(0, 0);
  },[
    url,
    index,
    queryString,
    itemsPerPage,
    dispatch,
    history
  ]);

  if (status === 'loading') {
    return (
      <Wrapper>
        <Msg>Loading...</Msg>
      </Wrapper>
    );
  } else if (numProducts === 0) {
    return (
      <Wrapper>
        <Msg>No products matched your filter settings</Msg>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Pager>
          <Button onClick={() => dispatch(requestProductsBack())}><LeftArrow /></Button>
          Showing products {index + 1} to{' '}
          {(index + itemsPerPage < numProducts) ? index + itemsPerPage : numProducts} of{' '}
          {numProducts} in total
          <Button onClick={() => dispatch(requestProductsNext())}><RightArrow /></Button>
        </Pager>
        <GridContainer>
          {products.map(product => <ProductSummary key={product._id} product={product} />)}
        </GridContainer>
        <Pager>
          <Button onClick={() => dispatch(requestProductsBack())}><LeftArrow /></Button>
          Showing products {index + 1} to{' '}
          {(index + itemsPerPage < numProducts) ? index + itemsPerPage : numProducts} of{' '}
          {numProducts} in total
          <Button onClick={() => dispatch(requestProductsNext())}><RightArrow /></Button>
        </Pager>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Msg = styled.div`
  text-align: center;
  font-size: 1.2rem;
  /* font-weight: bold; */
  margin-top: 20px;
`;

const Pager = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

const LeftArrow = styled(FiArrowLeftCircle)`
  transform: scale(1.5);
`;

const RightArrow = styled(FiArrowRightCircle)`
  transform: scale(1.5);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

export default ProductGrid;
