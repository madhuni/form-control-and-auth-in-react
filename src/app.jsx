import React, {Component} from 'react';

import './app.css';
import { connect } from 'react-redux';

// importing our action creator
// import { increment } from './store/actions/actions'; // importin single item
import * as actionCreators from './store/actions/actions';

class App extends Component {
  increaseCounter = () => {
    this.props.onCounterIncrement();
  }

  decrementCounter = (value) => {
    this.props.onCounterDecrement(10);
  }

  render() {
    return (
      <div className="app">
        <h1>Current Counter is: {this.props.counter}</h1>
        <button onClick={this.increaseCounter}>Increase</button>
        <button onClick={() => this.decrementCounter(10)}>Decrease</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCounterIncrement: () => {
      /* Instead of passing the `action` object */
      // dispatch({
      //   type: 'INCREMENT',
      //   value: counterValue
      // });

      /* We are going to use action creator which automatically create the action object */
      dispatch(actionCreators.increment());
    },
    onCounterDecrement: (counterValue) => {
      // dispatch(actionCreators.decrement(counterValue));

      /* Dispatching the Async function for dispatching the
      `action` we want to do */
      dispatch(actionCreators.decrementAsync(counterValue));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);