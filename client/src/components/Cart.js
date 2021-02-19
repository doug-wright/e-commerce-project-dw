import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { emptyCart } from '../actions';

import CartItem from './CartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);

  if (userCart.cart.length !== 0) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    const prices = userCart.cart.map(item => {return Number(item.price * item.quantity)});
    const cartTotal = formatter.format(prices.reduce((a, b) => a + b, 0));

    return (
      <Wrapper>
        <ItemContainer>
          {userCart.cart.map((cartItem, index) => <CartItem
            key={cartItem.cartId}
            index={index}
          />)}
        </ItemContainer>
        <CartSummary>
          <b>Cart Total: {cartTotal}</b>
          <p><Button>Checkout</Button></p>
          <p><Button onClick={() => dispatch(emptyCart())}>Empty cart</Button></p>
        </CartSummary>
      </Wrapper>
    );
  } else {
    return (
      <Empty>
        Your cart is empty
      </Empty>
    );
  }
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(170px, 1fr);
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const CartSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100vh;
  border-left: 1px solid #dddddd;
`;

const Button = styled.button`
  padding: 5px 15px;
  /* font-size: 1rem; */
  font-weight: bold;
  color: white;
  background-color: #8265a7;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  padding-top: 50px;
`;

export default Cart;
