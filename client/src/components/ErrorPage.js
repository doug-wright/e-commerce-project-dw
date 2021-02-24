import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import image from '../assets/wheels-off.png';

const ErrorPage = () => {
  return (
    <Wrapper>
      <img src={image} width="300" alt="car where wheels have fallen off" />
      <p><Oops>whoops a daisy...</Oops></p>
      <p>
        Looks like something broke.  Please try refreshing
        the page.
      </p>
      <p><HomeLink to="/">Home</HomeLink></p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-space-between;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  padding: 50px;
`;

const Oops = styled.span`
  font-size: 2rem;
  font-weight: bold;
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

export default ErrorPage;
