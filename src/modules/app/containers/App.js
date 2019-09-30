import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requireAuthentication } from 'shared/AuthenticatedComponent';
import Login from 'modules/login';
import Dashboard from 'modules/dashboard';
import { FestivalPage } from 'modules/dashboard';
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

  handleHeaderClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { isAuthenticated, user, location } = this.props;

    return (
      <AppWrapper height={HEIGHT} isAuthenticated={isAuthenticated}>
        <Header isAuthenticated={isAuthenticated} onHeaderClick={this.handleHeaderClick} />
        {isAuthenticated && (
          <MenuBar onLogout={this.handleLogout} user={user} location={location} />
        )}
        <div>
          <Route exact path="/" component={requireAuthentication(Dashboard)} />
          <Route exact path="/festival/:id" component={requireAuthentication(FestivalPage)} />
          <Route path="/login" component={Login} />
          <Route path="/artists" component={requireAuthentication(Artists)} />
          <Route path="/sound" component={requireAuthentication(Sound)} />
          <Route path="/visual" component={requireAuthentication(Visual)} />
          <Route path="/planner" component={requireAuthentication(Planner)} />
        </div>
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
