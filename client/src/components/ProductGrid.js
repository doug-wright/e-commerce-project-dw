import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import ProductItemSummary from './ProductItemSummary';

import {
  requestProducts,
  receiveProducts,
  receiveProductsError
} from '../actions';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector((state) => state.categoryFilter);
  const locationFilter = useSelector((state) => state.locationFilter);
  const products = useSelector((state) => state.products);

  // Fetch products based on filter selections
  useEffect(() => {
    dispatch(requestProducts());
    fetch('http://localhost:4000/api/v1/product/index/' + products.index + '/' + (products.itemsPerPage - 1))
      .then((res) => res.json())
      .then((json) => dispatch(receiveProducts(json.data)))
      .catch((err) => dispatch(receiveProductsError()));
  },[]);

  if (products.status === 'loading') {
    return (
      <>
        Loading
      </>
    );
    } else {
      return (
        <Wrapper>
          <Pager><LeftArrow />{products.index + 1} to {products.itemsPerPage} of {products.numProducts}<RightArrow /></Pager>
          <GridContainer>
            {products.products.map(product => <ProductItemSummary product={product} />)}
          </GridContainer>
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

const LeftArrow = styled(FiArrowLeftCircle)`
  transform: scale(1.5);
`;

const RightArrow = styled(FiArrowRightCircle)`
  transform: scale(1.5);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default ProductGrid;
