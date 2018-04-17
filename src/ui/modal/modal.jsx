import React from 'react';

import './modal.css';
import Backdrop from '../backdrop/backdrop';

const modal = (props) => {
  const classes = ['modal'];
  if (props.show) {
    classes.push('modal-open');
  } else {
    classes.push('modal-close');
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.clicked}/>
      <div className={classes.join(' ')} onClick={(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default modal;