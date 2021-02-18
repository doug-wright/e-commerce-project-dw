import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FiShoppingCart } from "react-icons/fi";

import { requestCart, receiveCart, receiveCartError } from '../actions';

import GlobalStyles from './GlobalStyles';
import FilterSelect from './FilterSelect';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const USER_ID = '930436bc-0220-4c66-b616-3615a5ae8801';

function App() {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);

  // Get cart
  useEffect(() => {
    dispatch(requestCart());
    fetch('/api/v1/cart/' + USER_ID)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          dispatch(receiveCart(json.data.cart));
        }
      })
      .catch(err => dispatch(receiveCartError()));
  }, [dispatch]);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header>
          <div>
            <Logo>iWear</Logo>
            <Slogan>The Wearable Technology Store</Slogan>
          </div>
          <Navigation>
            <CartContainer>
              <CartLink to="/cart"><FiShoppingCart /></CartLink>{userCart.cart !== null ? <CartItems>{userCart.cart.length}</CartItems> : null}
            </CartContainer>
          </Navigation>
        </Header>
        <Sidebar>
          <FilterSelect />
        </Sidebar>
        {/* <SubHeader> */}
          {/* <AppliedFilters /> */}
        {/* </SubHeader> */}
        {/* <Router> */}
          <Switch>
            <Route exact path="/">
              <ProductGridContainer>
                <ProductGrid />
              </ProductGridContainer>
            </Route>
            <Route exact path="/product/:productId">
              <ProductDetail />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(165px, 1fr) 4fr;
  grid-template-rows: 60px 60px 4fr;
  grid-template-areas:
    'header header'
    /* 'sidebar subheader' */
    'sidebar main'
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75px;
  font-size: 1.3rem;
`;

const CartLink = styled(Link)`
  text-decoration: none;
  line-height: 0;
  color: white;
  cursor: pointer;
`;

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35px;
`;

const CartItems = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
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
