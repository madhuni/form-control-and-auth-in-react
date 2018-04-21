import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/action-creators';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogoutClicked();
  }

  render() {
    return (
      <Redirect to="/auth" />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClicked: () => {
      dispatch(actionCreators.logout());
    }
  }
};

export default connect(null, mapDispatchToProps)(Logout);