import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  removeFromCart,
} from '../actions';

const CartItem = ({ cartId, productId, quantity, price }) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);

  // Fetch product details
  useEffect(() => {
    fetch('/api/v1/product/' + productId)
      .then((res) => res.json())
      .then((json) => setItem(json.data.product))
      .catch((err) => console.log(err));
  }, []);

  if (item !== null) {
    return (
      <Wrapper>
        <Img src={item.imageSrc} />
        <Details>
          <RemoveButton onClick={() => dispatch(removeFromCart(cartId))}>X</RemoveButton>{item.name}
        </Details>
      </Wrapper>
    );
  } else {
    return null;
  }
};

const Wrapper = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  box-shadow: 2px 2px 5px #dddddd;
`;

const Details = styled.div`
  padding-left: 10px;
`;

const RemoveButton = styled.button`
  padding: 2px 5px;
  margin-right: 3px;
  border: none;
  border-radius: 3px;
  box-shadow: 1px 1px 3px darkgray;
  font-weight: bold;
  color: white;
  background-color: red;
  cursor: pointer;
`;

export default CartItem;
