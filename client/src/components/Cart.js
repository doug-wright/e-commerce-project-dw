import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { requestEmptyCart, emptyCart, emptyCartError } from '../actions';

import CartItem from './CartItem';

const Cart = ({ userId }) => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const [displayModal, setDisplayModal] = useState('false');

  const handleEmptyCart = () => {
    dispatch(requestEmptyCart());
    fetch('/api/v1/cart/' + userId, { method: 'DELETE' })
      .then(res => res.json())
      .then(json => dispatch(emptyCart()))
      .catch(err => dispatch(emptyCartError()));
  };

  const handleModalButton = () => {
    if (displayModal === 'false') {
      setDisplayModal('true');
    } else {
      setDisplayModal('false');
    }
  };

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
        <Modal display={displayModal}>
          <FormContainer>
            <CloseModalButton onClick={handleModalButton}>x</CloseModalButton>
          </FormContainer>
        </Modal>
        <ItemContainer>
          {userCart.cart.map((cartItem, index) => <CartItem
            key={cartItem.cartId}
            index={index}
          />)}
        </ItemContainer>
        <CartSummary>
          <b>Cart Total: {cartTotal}</b>
          <p><Button onClick={handleModalButton}>Checkout</Button></p>
          <p><Button onClick={handleEmptyCart}>Empty cart</Button></p>
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

const Modal = styled.div`
  display: ${props => (props.display === 'false') ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* overflow: auto; */
  background-color: rgba(0,0,0,0.4);
`;

const FormContainer = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  /* box-shadow: 2px 2px #dddddd; */
  background-color: white;
`;

const CloseModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 10px;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: red;
  cursor: pointer;
  line-height: 0.7;
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
  /* height: calc(100vh - 60px); */
  /* height: 100%; */
  /* border-left: 1px solid #dddddd; */
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
