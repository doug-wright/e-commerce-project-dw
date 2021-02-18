import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { emptyCart } from '../actions';

import CartItem from './CartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);

  if (userCart.cart !== null) {
    return (
      <Wrapper>
        {userCart.cart.map(cartItem => <CartItem
          key={cartItem.cartId}
          cartId={cartItem.cartId}
          productId={cartItem.productId}
          quantity={cartItem.quantity}
          price={cartItem.price}
        />)}
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export default Cart;
