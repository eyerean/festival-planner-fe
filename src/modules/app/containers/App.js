import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requireAuthentication } from 'shared/AuthenticatedComponent';
import { Grid } from 'shared';
import Login from 'modules/login';
import Dashboard from 'modules/dashboard';
import Artists from 'modules/artists';
import Sound from 'modules/sound';
import Visual from 'modules/visual';
import Planner from 'modules/planner';
import loginActions from 'modules/login/actions';
import loginSelectors from 'modules/login/selectors';

import { AppWrapper, Header, MenuBar } from '../components';

const HEIGHT = window.innerHeight;

class App extends React.Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      //if for some reason user is forced un-authenticated, go to login screen
      this.props.history.push('/');
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user, location } = this.props;

    return (
      <AppWrapper height={HEIGHT} isAuthenticated={isAuthenticated}>
        <Header isAuthenticated={isAuthenticated} />
        {isAuthenticated && (
          <MenuBar onLogout={this.handleLogout} user={user} location={location} />
        )}
        <Grid>
          <Route exact path="/" component={requireAuthentication(Dashboard)} />
          <Route path="/login" component={Login} />
          <Route path="/artists" component={requireAuthentication(Artists)} />
          <Route path="/sound" component={requireAuthentication(Sound)} />
          <Route path="/visual" component={requireAuthentication(Visual)} />
          <Route path="/planner" component={requireAuthentication(Planner)} />
        </Grid>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: loginSelectors.isAuthenticated(state),
    user: loginSelectors.getUser(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(loginActions.logout, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
