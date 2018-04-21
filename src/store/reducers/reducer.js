import * as actionTypes from '../actions/action-types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.value.idToken,
    userId: action.value.localId,
    error: null,
    loading: false
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.value.message,
    loading: false
  }
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: null
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action); break;
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action); break;
    case actionTypes.AUTH_FAIL: return authFail(state, action); break;
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action); break;
    default: return state; break;
  }
};

export default reducer;