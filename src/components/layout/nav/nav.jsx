import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css';

const nav = (props) => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to='/' exact>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/gallery'>Gallery</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/auth'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default nav;