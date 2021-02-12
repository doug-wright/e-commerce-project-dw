import React from 'react';
import styled from 'styled-components';

const ProductItemSummary = ({ product }) => {
  return (
    <Wrapper>
      <Img src={product.imageSrc} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{product.price}</ProductPrice>
      <ProductStock stock={product.numInStock}>{product.numInStock > 0 ? product.numInStock + ' in stock' : 'Out of stock'}</ProductStock>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px 10px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
  box-shadow: 2px 2px 5px #dddddd;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ProductName = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;

const ProductPrice = styled.div`
  padding: 10px;
  font-weight: bold;
`;

const ProductStock = styled.div`
  display: inline;
  font-size: 0.6rem;
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 5px;
  color: white;
  background-color: ${props => props.stock > 0 ? 'green' : 'red'};
`;

export default ProductItemSummary;
