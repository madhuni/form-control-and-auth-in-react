import * as actionTypes from '../actions/action-types';

const appData = {

};

const reducer = (state = appData, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      console.log('AUTH_START is called');
      return state;
      break;
    case actionTypes.AUTH_SUCCESS:
      return state;
      break;
    case actionTypes.AUTH_FAIL:
      return state;
      break;
  
    default:
      return state;
      break;
  }
};

export default reducer;