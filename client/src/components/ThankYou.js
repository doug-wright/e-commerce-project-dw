import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ThankYou = () => {
  const checkout = useSelector((state) => state.checkout);

  return (
    <Wrapper>
      <Smiley>😊</Smiley>
      Thank you {checkout.firstName} for your purchase.
      <p>An email confirmation will be sent shortly with your purchase and tracking details</p>
      <p>Thanks again for shopping with iWear</p>
      <p><HomeLink to="/">Home</HomeLink></p>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-space-between;
  text-align: center;
  font-size: 1.2rem;
  padding: 50px;
`;

const Smiley = styled.div`
  text-align: center;
  font-size: 3rem;
  padding: 25px;
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

export default ThankYou;
