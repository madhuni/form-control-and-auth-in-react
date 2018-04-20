import React, {Component} from 'react';

import './auth.css';
import Input from '../../components/ui/input/input';
import user from '../../assets/images/user-icon.svg';

class Auth extends Component {
  state = {
    formControls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Enter Your Email...',
          name: 'User Email',
          id: '#email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        label: 'Email Address'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Enter Your Password...',
          name: 'User Password',
          id: '#password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        label: 'Password'
      },
    },
    formValidated: false
  };

  checkFormValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      isValid = pattern.test(value) && isValid;
    }

    return isValid;

  }

  checkOverallValidity = (updatedFormControls) => {
    var formValid = true;
    for (let element in updatedFormControls) {
      formValid = updatedFormControls[element].valid && formValid;
    }
    return formValid;
  }

  onInputChange = (event, element) => {
    const updatedFormControls = {
      ...this.state.formControls,
      [element]: {
        ...this.state.formControls[element],
        value: event.target.value,
        valid: this.checkFormValidity(event.target.value, this.state.formControls[element].validation),
        touched: true
      }
    };
    
    const isFormValid = this.checkOverallValidity(updatedFormControls);
    
    this.setState({formControls: updatedFormControls, formValidated: isFormValid});
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.formControls) {
      formElementsArray.push({
        id: key,
        config: this.state.formControls[key]
      });
    }

    return (
      <div className="auth">
        <form className="auth-form">
          <img src={user} alt="User Icon" width="100" height="100" className="user-icon"/>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.label}
              id={formElement.config.elementConfig.id}
              changed={(event) => this.onInputChange(event, formElement.id)}
              isValid={formElement.config.valid}
              isTouched={formElement.config.touched}
            />
          ))}
          <button type="submit" disabled={!this.state.formValidated} className="btn">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Auth;