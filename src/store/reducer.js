/* Adding initial state of the application */
import * as actionTypes from './actions/action-types';

const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state.counter,
        counter: state.counter + 1
      }
      break;

    case actionTypes.DECREMENT:
      return {
        ...state.counter,
        counter: state.counter - 10
      }
      break;
  
    default:
      return state;
      break;
  }
  return state;
};

export default reducer;