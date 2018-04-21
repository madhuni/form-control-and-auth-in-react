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
          {props.isAuthenticated ?
            <NavLink to='/logout'>Logout</NavLink> :
            <NavLink to='/auth'>Log In</NavLink>
          }    
        </li>
      </ul>
    </nav>
  );
};

export default nav;