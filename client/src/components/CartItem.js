import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  removeFromCart,
  updateCartQuantity
} from '../actions';

const CartItem = ({ index }) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const { cart } = useSelector((state) => state.userCart);

  // Fetch product details
  useEffect(() => {
    fetch('/api/v1/product/' + cart[index].productId)
      .then((res) => res.json())
      .then((json) => setItem(json.data.product))
      .catch((err) => console.log(err));
  }, []);

  const handleQuantityChange = (index, quantity) => {
    if ((/^\d+$/.test(quantity) || quantity === '')) {
      dispatch(updateCartQuantity(index, quantity));
    }
  };

  if (item !== null) {
    return (
      <Wrapper>
        <Img src={item.imageSrc} />
        <Details>
          <RemoveButton onClick={() => dispatch(removeFromCart(cart[index].cartId))}>x</RemoveButton>{item.name}
          <p>${cart[index].price}</p>
          <p>
            <label htmlFor={cart[index].cartId}>Quantity: </label>
            <Input type="text" name="qty" id={cart[index].cartId} maxLength="2" onChange={(ev) => handleQuantityChange(index, ev.target.value)} value={cart[index].quantity} />
          </p>
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
  width: 125px;
  height: 125px;
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
  position: relative;
  top: -2px;
  line-height: 0.8;
  padding: 2px 4px;
  margin-right: 3px;
  border: none;
  border-radius: 3px;
  box-shadow: 1px 1px 3px darkgray;
  font-weight: bold;
  color: white;
  background-color: red;
  cursor: pointer;
`;

const Input = styled.input`
  width: 25px;
`;

export default CartItem;
