import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import './app.css';
import Header from './components/layout/header/header';
import Auth from './pages/auth/auth';
import Gallery from './pages/gallery/gallery';
import Logout from './pages/auth/logout/logout';
import Home from './pages/home/home';

import * as actionCreators from './store/actions/action-creators';
import * as firebase from 'firebase';

class App extends Component {
  componentWillMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    return (
      <React.Fragment>
        <div className="app">
          <Header isAuthenticated={this.props.isAuthenticated} />
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => {
      dispatch(actionCreators.authCheckState());
    }
  } 
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));