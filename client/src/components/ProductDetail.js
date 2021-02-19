import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import {
  requestProductDetail,
  receiveProductDetail,
  receiveProductDetailError,
  addToCart
} from '../actions';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, status } = useSelector((state) => state.productDetail);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(requestProductDetail());
    fetch('/api/v1/product/' + productId)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveProductDetail(json.data.product));
        window.scrollTo(0, 0);
      })
      .catch((err) => dispatch(receiveProductDetailError()));
  },[dispatch, productId]);

  const handleAddToCart = () => {
    const newCartItem = {
      cartId: uuidv4(),
      productId: product._id,
      quantity: 1,
      price: product.price
    }

    dispatch(addToCart(newCartItem));
  };

  if (status === 'loading') {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return(
      <Wrapper>
        <Img src={product.imageSrc} />
        <Details>
          {product.name}
          <p>By: {product.company.name} <a href={product.company.url}>{product.company.url}</a></p>
          <p>${product.price}</p>
          <ProductStock stock={product.numInStock}>{product.numInStock > 0 ? product.numInStock + ' in stock' : 'Out of stock'}</ProductStock>
          <p>{product.numInStock !== 0 ? <Button onClick={handleAddToCart}>Add to cart</Button> : null}</p>
        </Details>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  padding: 10px;
  margin: 20px;
  border-radius: 20px;
  border: 1px solid #eeeeee;
  box-shadow: 5px 5px 10px #dddddd;
`;

const Details = styled.div`
  padding-top: 20px;
  padding-right: 10px;
`;

const ProductStock = styled.p`
  font-weight: bold;
  color: ${props => props.stock !==0 ? 'green' : 'red'}
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

export default ProductDetail;
