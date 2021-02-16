import React, { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const productsSummary = useSelector((state) => state.productsSummary);

  useEffect(() => {
    dispatch(requestProductsSummary());
    fetch(productsSummary.url + productsSummary.index + '/' + productsSummary.itemsPerPage + productsSummary.queryString)
      .then((res) => res.json())
      .then((json) => dispatch(receiveProductsSummary(json.data)))
      .catch((err) => dispatch(receiveProductsSummaryError()));
  },[
    productsSummary.url,
    productsSummary.index,
    productsSummary.queryString,
    productsSummary.itemsPerPage,
    dispatch
  ]);

  if (productsSummary.status === 'loading') {
    return (
      <>
        Loading
      </>
    );
    } else {
      return (
        <Wrapper>
          <Pager>
            <Button onClick={() => dispatch(requestProductsBack())}><LeftArrow /></Button>
            Showing products {productsSummary.index + 1} to{' '}
            {(productsSummary.index + productsSummary.itemsPerPage < productsSummary.numProducts) ? productsSummary.index + productsSummary.itemsPerPage : productsSummary.numProducts} of{' '}
            {productsSummary.numProducts} in total
            <Button onClick={() => dispatch(requestProductsNext())}><RightArrow /></Button>
          </Pager>
          <GridContainer>
            {productsSummary.products.map(product => <ProductSummary key={product._id} product={product} />)}
          </GridContainer>
          <Pager>
            <Button onClick={() => dispatch(requestProductsBack())}><LeftArrow /></Button>
            Showing products {productsSummary.index + 1} to{' '}
            {(productsSummary.index + productsSummary.itemsPerPage < productsSummary.numProducts) ? productsSummary.index + productsSummary.itemsPerPage : productsSummary.numProducts} of{' '}
            {productsSummary.numProducts} in total
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
`;

export default ProductGrid;
