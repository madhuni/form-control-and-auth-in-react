import React from 'react';

import './header.css';
import Nav from '../nav/nav';

const header = (props) => {
  return (
    <header className="header">
      <Nav />
    </header>
  );
};

export default header;