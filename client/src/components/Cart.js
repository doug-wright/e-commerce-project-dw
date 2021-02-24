import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  requestEmptyCart,
  emptyCart,
  emptyCartError,
  settingCheckoutFields,
  setCheckoutFields,
  setCheckoutFieldsError,
  resetCheckoutFields,
  requestProcessCart,
  processCart,
  processCartError
} from '../actions';

import CartItem from './CartItem';

const Cart = ({ userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const checkout = useSelector((state) => state.checkout);
  const [displayModal, setDisplayModal] = useState('false');

  const handleEmptyCart = () => {
    dispatch(requestEmptyCart());
    fetch('/api/v1/cart/' + userId, { method: 'DELETE' })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          dispatch(emptyCart());
        } else {
          dispatch(emptyCartError());
          history.push({ pathname: '/error-page' });
        }
      })
      .catch(err => {
        dispatch(emptyCartError())
        history.push({ pathname: '/error-page' });
      });
  };

  const handleModalButton = () => {
    if (displayModal === 'false') {
      dispatch(resetCheckoutFields());
      setDisplayModal('true');
    } else {
      setDisplayModal('false');
    }
  };

  const handlePurchaseClick = (ev) => {
    ev.preventDefault();
    // Validate input
    if (
      checkout.firstName === '' ||
      checkout.lastName === '' ||
      checkout.address1 === '' ||
      checkout.email === '' ||
      checkout.cardNumber === '' ||
      checkout.expiry === '' ||
      checkout.cvv === '') {
      dispatch(setCheckoutFieldsError('Please fill in all required fields'));
    } else {
      // Process cart
      dispatch(requestProcessCart());
      fetch('/api/v1/cart/process/' + userId, { method: 'POST' })
        .then(res => res.json())
        .then(json => {
          if (json.status === 200) {
            dispatch(processCart());
            dispatch(emptyCart());
            history.push({ pathname: '/thankyou' });
          } else {
            dispatch(processCartError());
            history.push({ pathname: '/error-page' });
          }
        })
        .catch(err => {
          dispatch(processCartError())
          history.push({ pathname: '/error-page' });
        });
    }
  };

  const handleInput = (ev) => {
    dispatch(settingCheckoutFields());
    dispatch(setCheckoutFields({ ...checkout, [ev.target.id]: ev.target.value }));
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
        <ModalContainer display={displayModal}>
          <Modal>
            <CloseModalButton onClick={handleModalButton}>x</CloseModalButton>
            <Checkout>Check Out</Checkout>
            <RequiredFields>{' '}(Required fields are in pink)</RequiredFields>
            <Form>
              <AddressContainer>
                <InputWide onChange={handleInput} type="text" name="firstname" id="firstName" placeholder="First name" value={checkout.firstName} />
                <InputWide onChange={handleInput} type="text" name="lastname" id="lastName" placeholder="Last name" value={checkout.lastName} />
                <InputWide onChange={handleInput} type="text" name="address1" id="address1" placeholder="Address 1" value={checkout.address1} />
                <InputWideNoStyle onChange={handleInput} type="text" name="address2" id="address2" placeholder="Address 2" value={checkout.address2} />
                <InputWide onChange={handleInput} type="text" name="email" id="email" placeholder="Email" value={checkout.email} />
              </AddressContainer>
              <CreditContainer>
                <InputWide onChange={handleInput} type="text" name="cardnumber" id="cardNumber" placeholder="Credit card number" value={checkout.cardNumber} />
                <Input onChange={handleInput} type="text" name="expiry" id="expiry" placeholder="Expiry" value={checkout.expiry} />
                <Input onChange={handleInput} type="text" name="cvv" id="cvv" placeholder="CVV" value={checkout.cvv} />
              </CreditContainer>
              <Button onClick={handlePurchaseClick}>Purchase</Button>
              <ErrorContainer>{checkout.error}</ErrorContainer>
            </Form>
          </Modal>
        </ModalContainer>
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
        <p><HomeLink to="/">Home</HomeLink></p>
      </Empty>
    );
  }
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(170px, 1fr);
`;

const ModalContainer = styled.div`
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

const Modal = styled.div`
  width: 500px;
  border-radius: 10px;
  background-color: white;
`;

const CloseModalButton = styled.button`
  display: inline-flex;
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

const Checkout = styled.div`
  display: inline;
  font-size: 1.3rem;
`;

const RequiredFields = styled.span`
  font-size: 0.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 5px 20px;
  border-top: 1px solid #dddddd;
`;

const InputWideNoStyle = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InputWide = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #ff9797;
  }

  &::-moz-placeholder { /* Firefox 19+ */
    color: #ff9797;
  }

  &:-ms-input-placeholder { /* IE 10+ */
    color: #ff9797;
  }

  &:-moz-placeholder { /* Firefox 18- */
    color: #ff9797;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 10px 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
    
  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #ff9797;
  }

  &::-moz-placeholder { /* Firefox 19+ */
    color: #ff9797;
  }

  &:-ms-input-placeholder { /* IE 10+ */
    color: #ff9797;
  }

  &:-moz-placeholder { /* Firefox 18- */
    color: #ff9797;
  }
`;

const AddressContainer = styled.div`
  margin-bottom: 25px;
`;

const CreditContainer = styled.div`
  margin-bottom: 10px;
`;

const ErrorContainer = styled.div`
  padding-top: 10px;
  text-align: center;
  color: red;
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
`;

const Button = styled.button`
  padding: 5px 15px;
  font-weight: bold;
  color: white;
  background-color: #8265a7;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-space-around;
  align-items: center;
  font-size: 1.5rem;
  padding-top: 50px;
`;

const HomeLink = styled(Link)`
  padding: 5px 15px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  background-color: #8265a7;
  border: none;
  border-radius: 5px;
`;

export default Cart;
