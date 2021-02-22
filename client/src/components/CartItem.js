import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  requestUpdateCartItem,
  updateCartItem,
  updateCartItemError,
  requestDeleteCartItem,
  deleteCartItem,
  deleteCartItemError
} from '../actions';

const CartItem = ({ index }) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [qtyInput, setQtyInput] = useState(0);
  const { cart } = useSelector((state) => state.userCart);

  // Fetch product details
  useEffect(() => {
    fetch('/api/v1/product/' + cart[index].productId)
      .then((res) => res.json())
      .then((json) => {
        setItem(json.data.product);
        setQtyInput(cart[index].quantity);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInput = (ev) => {
    if (/^\d+$/.test(ev.target.value) && ev.target.value !== 0) {
      setQtyInput(Number(ev.target.value));
    }
  };

  const handleCartUpdate = (index, quantity) => {
    const updatedCartItem = {
      cartId: cart[index].cartId,
      productId: cart[index].productId,
      quantity: quantity,
      price: cart[index].price
    };

    dispatch(requestUpdateCartItem());
    fetch('/api/v1/cart/' + cart[index].cartId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCartItem)
    })
      .then(res => res.json())
      .then(json => dispatch(updateCartItem(updatedCartItem)))
      .catch(err => dispatch(updateCartItemError));
  }

  const handleCartDeleteItem = (cartId) => {
    dispatch(requestDeleteCartItem());
    fetch('/api/v1/cart/' + cartId, { method: 'PATCH' })
      .then(res => res.json())
      .then(json => dispatch(deleteCartItem(cartId)))
      .catch(err => dispatch(deleteCartItemError));
  };

  if (item !== null) {
    return (
      <Wrapper>
        <Img src={item.imageSrc} />
        <Details>
          <RemoveButton onClick={() => handleCartDeleteItem(cart[index].cartId)}>x</RemoveButton>{item.name}
          <p>${cart[index].price}</p>
          <p>
            <label htmlFor={cart[index].cartId}>Quantity: </label>
            <Input type="text" name="qty" id={cart[index].cartId} maxLength="2" onChange={handleInput} defaultValue={cart[index].quantity} />
            <UpdateQtyBtn onClick={() => handleCartUpdate(index, qtyInput)}>Update quantity</UpdateQtyBtn>
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

const UpdateQtyBtn = styled.button`
  padding: 2px 4px;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  background-color: #8265a7;
  color: white;
  cursor: pointer;
`;

const Input = styled.input`
  width: 25px;
  margin-right: 10px;
`;

export default CartItem;
