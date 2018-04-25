import React from 'react';

import './input.css';

const input = (props) => {
  let inputElement = null;
  let errorMsg = null;
  let inputClasses = props.isTouched ? (!props.isValid ? ['input-element', 'input-invalid'] : ['input-element', 'input-valid']) : ['input-element'];

  switch (props.elementType) {
    case 'input':
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} required/>;
      break;
    case 'textarea':
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} required/>;
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} required>
          {props.options.map(element => (
            <option key={element.value} value={element.value}>{element.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input className="input-element" {...props.elementConfig} onChange={props.changed} required/>
      break;
  }

  switch (props.elementConfig.type) {
    case 'email':
      errorMsg = 'Enter a valid email';
      break;
    case 'password':
      errorMsg = 'Password must have 6 characters'
      break;
  
    default:
      break;
  }

  const error = props.isTouched ? (!props.isValid ? <span className="error-msg">{errorMsg}</span> : null) : null;
  return (
    <div className="form-control">
      <label className="label"  htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {error}
    </div>
  );
};

export default input;