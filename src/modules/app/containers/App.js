import React from 'react';
import {Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {requireAuthentication} from '../../../shared/AuthenticatedComponent';
import Login from '../../login';
import Dashboard from '../../dashboard';
import Artists from '../../artists';
import Sound from '../../sound';
import Visual from '../../visual';
import Planner from '../../planner';

import AppWrapper from '../components/AppWrapper';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import loginActions from '../../login/actions';
import loginSelectors from '../../login/selectors';

const HEIGHT = window.innerHeight;

class App extends React.Component {
  componentWillMount(){
    if(!this.props.isAuthenticated){
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps){
   if(this.props.isAuthenticated && !nextProps.isAuthenticated){
      //if for some reason user is forced un-authenticated, go to login screen
      this.props.history.push('/');
    } 
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.logout();
  }

  render() {
    const {isAuthenticated, user, location } = this.props;

    return (
      <AppWrapper height={HEIGHT}>
        <Header />
        {isAuthenticated && <NavBar onLogout={this.handleLogout} user={user} location={location} /> }
        <Route exact path="/" component={requireAuthentication(Dashboard)} />
        <Route path="/login" component={Login}/>
        <Route path="/artists" component={requireAuthentication(Artists)} />
        <Route path="/sound" component={requireAuthentication(Sound)} />
        <Route path="/visual" component={requireAuthentication(Visual)} />
        <Route path="/planner" component={requireAuthentication(Planner)} />
      </AppWrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    isAuthenticated: loginSelectors.isAuthenticated(state),
    user: loginSelectors.getUser(state)
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    logout: bindActionCreators(loginActions.logout, dispatch)
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

