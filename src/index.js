import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './store/reducers/reducer';

import './styles/index.css';
import App from './app.jsx';

/* Defining a sample 'logger' middlewar function */
const logger = (store) => { // this function receives 'store' as arguments
  return (next) => { // then it returns another function which receive 'next' fn
    return (action) => { // it returns another fn which receives the 'action'
      console.log('[Middleware] dispatching', action);
      const result = next(action); // this function will take the action
      console.log('[Middleware] next state', store.getState());
      return result;
    }
  }
};

/* Adding the Redux Dev Tool setup */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// adding 'logger' and 'thunk' as the middlewares
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const destination = document.getElementById('root');
ReactDom.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  destination
);