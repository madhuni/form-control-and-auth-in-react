import React from 'react';
import ReactDom from 'react-dom';

import './styles/index.css';
import App from './app.jsx';

const destination = document.getElementById('root');
ReactDom.render(
  <App />,
  destination
);