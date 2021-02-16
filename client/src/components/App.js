import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import FilterSelect from './FilterSelect';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';

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
        {/* <SubHeader> */}
          {/* <AppliedFilters /> */}
        {/* </SubHeader> */}
        <Router>
          <Switch>
            <Route exact path="/">
              <ProductGridContainer>
                <ProductGrid />
              </ProductGridContainer>
            </Route>
            <Route exact path="/product/:productId">
              <ProductDetail />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(185px, 1fr) 4fr;
  grid-template-rows: 60px 60px 4fr;
  grid-template-areas:
    'header header'
    /* 'sidebar subheader' */
    'sidebar main'
`;

const Header = styled.div`
  grid-area: header;
  padding: 10px;
  color: white;
  /* background-color: #404040; */
  /* background-color: #2f2fa2; */
  /* background-color: #242582; */
  background-color: #5d5c61;
  /* background-color: #557a95; */
  /* background-color: #8265a7; */
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
  height: 100vh;
  padding: 5px;
  border-right: 1px solid #dddddd
`;

/* const SubHeader = styled.div`
  grid-area: subheader;
  padding: 5px;
  border-bottom: 1px solid #dddddd;
`; */

const ProductGridContainer = styled.div`
  grid-area: main;
  padding: 5px;
`;

export default App;
