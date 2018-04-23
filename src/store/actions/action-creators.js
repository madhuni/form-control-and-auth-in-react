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
  /* While logging out, removing the Token and Expiring Date from localstorage */
  localStorage.removeItem('idToken');
  localStorage.removeItem('expiringDate');
  localStorage.removeItem('userId');
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
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]';

    if (!isSignUP) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]';
    }

    axios.post(url, data)
      .then(res => {
        console.log(res);
        const expiringDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        /* Storing the Token & expiring Data in the local storage */
        localStorage.setItem('idToken', res.data.idToken);
        localStorage.setItem('expiringDate', expiringDate);
        localStorage.setItem('userId', res.data.localId);

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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('idToken');
    if (!token) {
      dispatch(logout());
    } else {
      const expiringDate = new Date(localStorage.getItem('expiringDate'));
      const userId = localStorage.getItem('userId');
      const newExpiringTime = (expiringDate.getTime() / 1000) - (new Date().getTime() / 1000);
      // console.log(expiringTime);
      if (expiringDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess({
          idToken: token,
          localId: userId
        }));
        dispatch(checkAuthTimeout(newExpiringTime));
      }
    }
  }
};