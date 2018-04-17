import React from 'react';

import './backdrop.css';

const backdrop = (props) => {
  const classes = ['backdrop'];
  
  if (props.show) {
    classes.push('backdrop-open');
  } else {
    classes.push('backdrop-close');
  }

  return (
    <div className={classes.join(' ')} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default backdrop;