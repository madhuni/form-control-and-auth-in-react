import * as actionTypes from '../actions/action-types';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const authSuccess = (successData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    value: successData
  };
};
const authFail = (errData) => {
  return {
    type: actionTypes.AUTH_FAIL,
    value: errData
  };
};
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

/* Async action-creator to dispatch logout event */
export const checkAuthTimeout = (expiringTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiringTime * 1000);
  };
};

/* Async action-creators which are using 'thunks' package to get the 'dispatch' */
export const auth = (email, password, isSignUP) => {
  return (dispatch) => {
    /* Dispatching the AUTH_START action */
    dispatch(authStart());

    /* Making the post data for authentication */
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    /* Sending a post request for user SIGN-UP/SIGN-IN */
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCeCfnFOEgD_y7Bw6EaZH9h_nEsSEKn9oE';

    if (!isSignUP) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCeCfnFOEgD_y7Bw6EaZH9h_nEsSEKn9oE';
    }

    axios.post(url, data)
      .then(res => {
        console.log(res);
        /* Dispatching the AUTH_SUCCESS action */
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        /* Dispatching the AUTH_FAIL action */
        dispatch(authFail(err.response.data.error));
      })
  };
};