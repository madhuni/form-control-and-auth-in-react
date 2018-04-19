import * as actionTypes from './action-types';

export const increment = (value) => {
  return {
    type: actionTypes.INCREMENT, // setting the type of action
    value: value // setting the value of the action
  };
};

/* This is the actual 'decrement' action creator */
export const decrement = (value) => {
  return {
    type: actionTypes.DECREMENT, // setting the type of action
    value: value // setting the value of the action
  };
};

/* But since we want some delay or do some asyn stuff
we are going to use this particular funtion which after some
time, will dispatch the same `action` using the `decrement`
action creator */
export const decrementAsync = (value) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(decrement(value));
    }, 4000);
  }
};