import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import './auth.css';
import Input from '../../components/ui/input/input';
import user from '../../assets/images/user-icon.svg';

import * as actionCreators from '../../store/actions/action-creators';
import Spinner from '../../components/ui/spinner/spinner';
import Modal from '../../components/ui/modal/modal';

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
    formValidated: false,
    isSignUp: false
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

  onToggleAuthMode = () => {
    this.setState(prevState => {
      return {isSignUp: !this.state.isSignUp}
    });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const email = this.state.formControls.email.value;
    const password = this.state.formControls.password.value;
    this.props.onAuthStart(email, password, this.state.isSignUp);
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.formControls) {
      formElementsArray.push({
        id: key,
        config: this.state.formControls[key]
      });
    }

    let errorMsg = null;
    if (this.props.error) {
      // errorMsg = <p className="auth-error-msg">This email is already resgistered.<br/>Please try to sign up with a new email.</p>;
      errorMsg = <p className="auth-error-msg">{this.props.error}</p>;
    }

    return (
      <React.Fragment>
        {this.props.isAuthenticated ? 
          <Redirect to="/gallery" /> :
          <div className="auth">
            {errorMsg}
            {!this.props.loading ? 
              <React.Fragment>
                <form className="auth-form" onSubmit={this.onSubmitHandler}>
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
                  <button type="submit" disabled={!this.state.formValidated} className="btn">
                    {this.state.isSignUp ? 'Sign UP' : 'Sign In'}
                  </button>
                </form>
                <div className="switch-mode">
                  <p>Not having an account? Click below button to create one.</p>
                  <button className="btn btn--switch" onClick={this.onToggleAuthMode}>
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </div>
              </React.Fragment> :
              <React.Fragment>
                <Spinner />
                <p className="loading-msg">
                  Please wait while we are {this.state.isSignUp ? 'creating a new account...' : 'signing you in...'}
                </p>
              </React.Fragment>
            }
          </div>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    error: state.error,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthStart: (email, password, isSignUp) => {
      dispatch(actionCreators.auth(email, password, isSignUp)); // important we need to call the fn
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);