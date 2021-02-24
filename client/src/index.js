import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import GlobalStyles from './components/GlobalStyles';
import App from './components/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyles />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
