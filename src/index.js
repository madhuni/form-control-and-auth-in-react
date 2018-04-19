import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import './styles/index.css';
import App from './app.jsx';

import reducer from './store/reducer';

// importing fucntions from 'redux-thunk' package to create async actions
import thunk from 'redux-thunk';

/**
 * Adding 'Middleware' in the redux.
 * Note that Redux takes care of running this function by itself.
 * We just need to provide the structure of the function and add our custom logic
*/

/* Adding the Redux Dev Tool setup */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
/**
 * for using this we will need to wrap our middleware into this function.
 * Follow the instructions on the below link:
 * https://github.com/zalmoxisus/redux-devtools-extension
 */

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

// adding the Middleware to the store
// we can pass a list of middleware in the 'applyMiddleware' function
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

const destination = document.getElementById('root');
ReactDom.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  destination
);