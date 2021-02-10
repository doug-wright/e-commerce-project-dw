import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import FilterSelect from './FilterSelect';
import AppliedFilters from './AppliedFilters';
import ProductGrid from './ProductGrid';

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Header>
          <Logo>iWear</Logo>
          <Slogan>The Wearable Technology Store</Slogan>
        </Header>
        <Sidebar>
          <FilterSelect />
        </Sidebar>
        <SubHeader>
          <AppliedFilters />
        </SubHeader>
        <ProductGridContainer>
          <ProductGrid />
        </ProductGridContainer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header header'
    'sidebar subheader subheader subheader subheader'
    'sidebar main main main main'
`;

const Header = styled.div`
  grid-area: header;
  padding: 10px;
  color: white;
  background-color: #404040;
  /* border: 1px solid red; */
`;

const Logo = styled.span`
  padding-right: 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: bold;
`;

const Slogan = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  padding: 20px;
  border: 1px solid red;
`;

const SubHeader = styled.div`
  grid-area: subheader;
  padding: 20px;
  border: 1px solid red;
`;

const ProductGridContainer = styled.div`
  grid-area: main;
  padding: 20px;
  border: 1px solid red;
`;

export default App;
